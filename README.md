<p align="center">
  <img src="https://api.iconify.design/tabler/database-search.svg?color=%23C8102E" alt="Banco de Dados com Lupa UFMG" width="80" />
</p>

<h1 align="center"><strong>ProvLab: Laboratório de Proveniência de Dados</strong></h1>

<p align="center">
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/UFMG-C8102E?style=for-the-badge" />
</p>

<p align="center">
  <a href="#sobre">Sobre</a> • 
  <a href="#arquitetura">Arquitetura</a> •
  <a href="#pre-requisitos">Pré-requisitos</a> •
  <a href="#setup">Setup</a> •
  <a href="#fluxo-etl">Fluxo ETL</a> •
  <a href="#proveniencia">Proveniência</a> • 
  <a href="#colaboradores">Colaboradores</a>
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

A arquitetura do projeto é dividida em duas camadas principais:

- **Orquestração de Banco (Node-pg-migrate):** Gerenciamento de migrações (DDL) e carga de dados (DML), garantindo que a extensão **ProvSQL** seja ativada corretamente nas tabelas criadas.
- **Ambiente Docker (PostgreSQL/GProM):** Container customizado que compila o seletor de proveniência **GProM** sobre uma instância de PostgreSQL já preparada com **ProvSQL**.

---

<h2 id="pre-requisitos">📋 Pré-requisitos e Repositórios</h2>

### 🛠️ Ferramentas Necessárias

Para compilar e executar o laboratório, você precisará instalar:

| Ferramenta  | Link de Download                                                    | Finalidade                                              |
| :---------- | :------------------------------------------------------------------ | :------------------------------------------------------ |
| **Node.js** | [👉 Baixar Node.js](https://nodejs.org/)                            | Execução do ambiente de migrações e scripts.            |
| **Docker**  | [👉 Baixar Docker](https://www.docker.com/products/docker-desktop/) | Conteinerização do banco e ferramentas de proveniência. |

### 📚 Bibliotecas de Proveniência

Este laboratório integra as seguintes ferramentas de código aberto:

- **ProvSQL:** Extensão para PostgreSQL que adiciona suporte a proveniência de dados.
  - [🔗 Repositório Oficial ProvSQL](https://github.com/InriaValda/provsql)
- **GProM (Database Provenance Middleware):** Sistema que permite extrair proveniência de consultas SQL através de reescrita de query.
  - [🔗 Repositório Oficial GProM](https://github.com/IITDBGroup/gprom)

---

<h2 id="setup">🛠️ Setup do Ambiente</h2>

### ⚙️ Executando o Laboratório

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/alexbeldam/prov-lab.git
   cd prov-lab
   ```
2. **Configure o ambiente de dados:**
   - **Linux/macOS:** Dê permissão de execução e execute:

   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

   - **Windows:** Execute o script no diretório raiz:

   ```bash
   ./setup.bat
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

Para garantir a precisão das ferramentas de proveniência, o projeto utiliza uma **Tipagem Estrita** centralizada:

- **Schemas Únicos:** As definições em definitions/schemas.js regem tanto a criação das tabelas no banco quanto a formatação dos valores no dump gerado pelo Python.

- **Tipos Mapeados:**
  - **int8/int4:** Para códigos de categorias, IDs de município e unidades de medida.
  - **date:** Para datas de notificação, ocorrência e óbito.
  - **float8:** Para coordenadas geográficas e áreas.
  - **text:** Para nomes, descrições nominais e códigos CID-10.

---

<h2 id="proveniencia">🔍 Testando a Proveniência</h2>

Uma vez que o ambiente esteja configurado, você pode acessar as ferramentas de proveniência diretamente via CLI utilizando os scripts customizados do package.json.

> Nota: Caso os containers ainda não estejam ativos, certifique-se de rodar `pnpm docker:start` antes de iniciar as ferramentas interativas.

⌨️ **Acesso às Ferramentas**

Para rodar o terminal interativo do ProvSQL:

```bash
# Inicie o container se necessário
pnpm docker:start

# Acesse o terminal ProvSQL
pnpm provsql
```

Para executar comandos via GProM:

```bash
# Inicie o container se necessário
pnpm docker:start

# Acesse o terminal ProvSQL
pnpm pgprom
```

---

<p align="center"> Feito com 🧠 para a pesquisa em proveniência de dados da UFMG </p>
