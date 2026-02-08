import pandas as pd
from dbfread import DBF
import os
import sys
import threading
import time
import re

DBF_DIR = 'data'
SQL_DIR = 'migrations'
SCHEMA_SQL = 'migrations/01_create_tables.sql'
COD_BH = '310620'
SAMPLE_LIMIT = 20000

TYPE_MAP = {
    "BIGINT": "int",
    "INTEGER": "int",
    "TEXT": "str",
    "DATE": "date",
    "DOUBLE PRECISION": "decimal",
}

def parse_sql_schema(sql_path):
    if not os.path.exists(sql_path):
        raise FileNotFoundError(f"{sql_path} não encontrado")
    
    with open(sql_path, "r", encoding="utf-8") as f:
        sql_text = f.read()

    schemas = {}

    table_blocks = re.findall(
        r"CREATE TABLE IF NOT EXISTS (\w+)\s*\((.*?)\);",
        sql_text,
        re.S
    )

    for table_name, body in table_blocks:
        table_schema = {}
        for line in body.splitlines():
            line = line.strip()
            if not line or line.startswith("id ") or line.startswith("--"):
                continue

            m = re.match(r'"?(\w+)"?\s+([A-Z\s]+)', line)
            if m:
                col, sql_type = m.groups()
                py_type = TYPE_MAP.get(sql_type.strip(), "str")
                table_schema[col] = py_type
        schemas[table_name.lower()] = table_schema

    return schemas

def format_sql_value(val, col_type):
    if pd.isna(val) or str(val).strip().lower() in ['none', 'nan', '']:
        return "NULL"
    
    if any(t in col_type for t in ['int', 'float', 'decimal']):
        try:
            if 'int' in col_type:
                return str(int(float(val)))
            return str(float(val))
        except:
            return "NULL"
    
    clean_val = str(val).replace("'", "''")
    return f"'{clean_val}'"

def spinner_task(stop_event, message):
    spinner = ['|', '/', '-', '\\']
    idx = 0
    while not stop_event.is_set():
        sys.stdout.write(f'\r{message} {spinner[idx]}')
        sys.stdout.flush()
        idx = (idx + 1) % len(spinner)
        time.sleep(0.1)
    sys.stdout.write('\r' + ' ' * (len(message) + 20) + '\r')

def dbf_to_sql(dbf_path, table_name, output_sql, schemas, filter_col=None, filter_val=None):
    os.makedirs(os.path.dirname(output_sql), exist_ok=True)
    
    stop_spinner = threading.Event()
    spinner_thread = threading.Thread(target=spinner_task, args=(stop_spinner, f"📖 Processando {table_name}..."))
    spinner_thread.start()
    
    try:
        table = DBF(dbf_path, encoding='iso-8859-1')
        df = pd.DataFrame(iter(table))
        df.columns = [col.lower() for col in df.columns]

        if 'contador' in df.columns:
            df = df.drop(columns=['contador'])

        if filter_col and filter_val:
            f_col = filter_col.lower()
            if f_col in df.columns:
                df[f_col] = df[f_col].astype(str).str.strip()
                df = df[df[f_col].str.startswith(filter_val)]

        if len(df) > SAMPLE_LIMIT:
            df = df.sample(n=SAMPLE_LIMIT, random_state=23)
        
        df = df.map(lambda x: x.strip() if isinstance(x, str) else x)
        
    finally:
        stop_spinner.set()
        spinner_thread.join()

    if df.empty:
        print(f"⚠️  {table_name}: Nenhum registro encontrado.")
        return

    print(f"✅ {table_name}: {len(df)} registros preparados.")

    current_schema = schemas.get(table_name, {})

    with open(output_sql, 'w', encoding='utf-8') as f:
        f.write("BEGIN;\n\n")

        chunk_size = 5000
        for i in range(0, len(df), chunk_size):
            chunk = df.iloc[i:i+chunk_size]
            columns_list = '", "'.join(chunk.columns)
            f.write(f'INSERT INTO "{table_name}" ("{columns_list}") VALUES \n')
            
            rows = []
            for _, row in chunk.iterrows():
                row_fmt = []
                for col, val in row.items():
                    col_type = current_schema.get(col, 'text')
                    row_fmt.append(format_sql_value(val, col_type))
                rows.append(f"({', '.join(row_fmt)})")
            
            f.write(",\n".join(rows))
            f.write(";\n\n")

        f.write("COMMIT;\n")

    print(f"💾 {output_sql} pronto.")

if __name__ == "__main__":
    print("🚀 Iniciando ingestão de dados...")
    print(f"📍 Filtrando por Município de Residência: Belo Horizonte ({COD_BH})")
    print("-" * 50)

    schemas = parse_sql_schema(SCHEMA_SQL)

    sim_file = f'{DBF_DIR}/DOMG2020.dbf'
    if os.path.exists(sim_file):
        dbf_to_sql(sim_file, 'sim', f'{SQL_DIR}/02_seed_sim.sql', schemas, 'CODMUNRES', COD_BH)
    else:
        print(f"ℹ️  Arquivo {sim_file} não existe. Pulando.")

    sinan_file = f'{DBF_DIR}/VIOLBR20.dbf'
    if os.path.exists(sinan_file):
        dbf_to_sql(sinan_file, 'sinan', f'{SQL_DIR}/03_seed_sinan.sql', schemas, 'ID_MN_RESI', COD_BH)
    else:
        print(f"ℹ️  Arquivo {sinan_file} não existe. Pulando.")

    print("-" * 50)
    print("✨ Processo de ingestão concluído!")
