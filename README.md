<p align="center">
  <img src="https://api.iconify.design/tabler/database-search.svg?color=%23C8102E" alt="Banco de Dados com Lupa UFMG" width="80" />
</p>

<h1 align="center"><strong>ProvLab: Laboratório de Proveniência de Dados</strong></h1>

<p align="center">
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/UFMG-C8102E?style=for-the-badge" />
</p>

<p align="center">
  <a href="#sobre">Sobre</a> • 
  <a href="#arquitetura">Arquitetura</a> •
  <a href="#pre-requisitos">Pré-requisitos</a> •
  <a href="#setup">Setup</a> •
  <a href="#dados">Dados</a> •
  <a href="#proveniencia">Proveniência</a> 
</p>

<p align="center">
  <b>Ambiente experimental para análise de proveniência de dados em saúde (SIM e SINAN), utilizando ProvSQL e GProM.</b>
</p>

---

<h2 id="sobre">📌 Sobre</h2>

O **ProvLab** é um ambiente de pesquisa desenvolvido para realizar o _linkage_ (cruzamento) de grandes bases de dados públicas do DATASUS (**SIM** e **SINAN**), com foco em rastrear a origem da informação através de polinômios de proveniência.

O laboratório permite analisar a jornada da informação desde a notificação de violência até o registro oficial de óbito, garantindo transparência e rastreabilidade científica.

---

<h2 id="arquitetura">🏗️ Arquitetura e Tecnologias</h2>

A arquitetura do projeto é organizada em um único container autosuficiente, que inclui:

- **PostgreSQL com ProvSQL:** Banco de dados já configurado com a extensão de proveniência.

- **GProM:** Middleware de proveniência compilado e pronto para consultas de rastreabilidade.

- **Logs e Rotação:** Todos os logs (`provsql.log` e `migrations.log`) são gravados dentro do container e rotacionados automaticamente via `logrotate`.

> 💡 Toda a orquestração e execução das migrações são feitas internamente pelo container, sem necessidade de ferramentas externas.

---

<h2 id="pre-requisitos">📋 Pré-requisitos</h2>

### 🛠️ Ferramentas Necessárias

Para rodar o ProvLab **não é necessário instalar nada além do Docker e Docker Compose**. Todo o ambiente é construído e executado dentro do container.

| Ferramenta | Link de Download                                                    | Finalidade                                              |
| :--------- | :------------------------------------------------------------------ | :------------------------------------------------------ |
| **Docker** | [👉 Baixar Docker](https://www.docker.com/products/docker-desktop/) | Conteinerização do banco e ferramentas de proveniência. |

---

<h2 id="setup">🛠️ Setup do Ambiente</h2>

### ⚙️ Executando o Laboratório com Docker

1. **Clone o repositório:**

```bash
git clone https://github.com/alexbeldam/prov-lab.git
cd prov-lab
```

2. **Suba o container ProvLab:**

```bash
docker-compose up -d --build
```

- Isso cria o container `provlab` com PostgreSQL, ProvSQL e GProM já compilados e prontos para uso.
- Os logs do laboratório ficam em `./logs` no host, persistindo informações de execução.

3. **Verifique se o container está rodando:**

```bash
docker ps
```

4. **Acesse o terminal interativo do ProvSQL:**

```bash
docker-compose exec provlab provsql
```

5. **Acesse o terminal do GProM para consultas de proveniência:**

```bash
docker-compose exec provlab gprom
```

---

<h2 id="dados">📁 Origem e preparação dos Dados</h2>

Os dados utilizados neste laboratório são provenientes de bases públicas do **DATASUS**, especificamente dos sistemas **SIM** (Sistema de Informações sobre Mortalidade) e **SINAN** (Sistema de Informação de Agravos de Notificação).

## 🔷 Fonte Original

Os conjuntos de dados são disponibilizados oficialmente pelo DATASUS no formato **DBC**, que corresponde a arquivos DBF comprimidos utilizando o algoritimo PKWare.

### 🔷 Expansão e Conversão

Para utilização no ambiente experimental, os arquivos DBC foram:

1. **Expandidos para o formato DBF**, preservando integralmente o conteúdo original;
2. **Ingeridos por meio de um script em Python**, responsável por:
   - realizar a leitura dos DBFs;
   - aplicar a tipagem estrita definida no projeto;
   - gerar os **SQL dumps** presentes neste repositório.

### 🔷 Artefatos Versionados

Os arquivos DBF originais **não fazem parte deste repositório**, por serem dados externos, volumosos e imutáveis.  
O repositório versiona apenas:

- os **SQL dumps resultantes da ingestão**;
- o **script de ingestão**, mantido como documentação executável do processo de transformação.

Essa separação garante **reprodutibilidade, rastreabilidade e clareza na proveniência dos dados**, sem acoplamento direto a formatos legados.

---

<h2 id="fluxo-etl">🧹 Fluxo de Dados e Tipagem</h2>

Para garantir a precisão das ferramentas de proveniência, o projeto utiliza uma Tipagem Estrita centralizada:

- **Schemas Derivados de SQL:**  
  As definições das tabelas vêm da migration `migrations/01_create_tables.sql`. O script Python lê essas definições e gera os arquivos de seed (`02_seed_sim.sql` e `03_seed_sinan.sql`), garantindo que os tipos de dados estejam consistentes entre o banco e o dump.

- **Tipos Mapeados no Python:**

| SQL Type         | Python Type | Observação                               |
| ---------------- | ----------- | ---------------------------------------- |
| BIGINT, INTEGER  | int         | IDs, códigos, quantidades                |
| DATE, TEXT       | str         | Datas, nomes, descrições, códigos CID-10 |
| DOUBLE PRECISION | float       | Coordenadas geográficas, áreas           |

Dessa forma, o fluxo ETL mantém integridade e consistência de tipos entre os DBFs, os seeds gerados e o banco PostgreSQL com ProvSQL.

---

<h2 id="proveniencia">🔍 Testando a Proveniência</h2>

Uma vez que o ambiente esteja configurado, você pode acessar as ferramentas de proveniência diretamente via CLI utilizando os scripts do container.

### ⌨️ Acesso às Ferramentas

Para rodar o terminal interativo do ProvSQL:

```bash
docker-compose exec provlab provsql
```

Para executar comandos via GProM:

```bash
docker-compose exec provlab gprom
```

---

<p align="center"> Feito com 🧠 para a pesquisa em proveniência de dados da UFMG </p>
