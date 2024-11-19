# trabalho-final-api-node-js

Trabalho final desenvolvido para a disciplina de Plataformas Back-End NodeJS da PUC Minas

O projeto se trata de uma API de Filmes para gerenciamento de informações sobre filmes. Ela permite realizar operações como:

- Consultar os filmes ou buscar por um filme específico com base no ID.
- Adicionar novos filmes com informações como título, diretor, ano e gênero.
- Atualizar os dados de um filme.
- Excluir um filme pelo ID.

Todos os dados estão sendo salvos e gerenciados no MongoDB.

![Generic badge](https://img.shields.io/badge/Node-blue)
![Generic badge](https://img.shields.io/badge/mongodb-green)

## Documentação da API

[Swagger](https://trabalho-final-api-node-js.onrender.com/api-docs)

## URL de acesso à API em produção

https://trabalho-final-api-node-js.onrender.com/movies

## Requisitos

- Git
- Node 20+
- NPM

## Rodando a aplicação

Clone o projeto

HTTP:

```bash
  git clone https://github.com/Renato556/trabalho-final-api-node-js
```

ou SSH:

```bash
  git clone git@github.com:Renato556/trabalho-final-api-node-js
```

Entre no diretório do projeto

```bash
  cd trabalho-final-api-node-js
```

Instale as dependências

```bash
  npm i
```

Crie um arquivo .env com as seguintes variáveis

```text
HOST=localhost
PORT=3000
MONGODB_URI=URI DE CONEXÃO DO SEU MONGO ATLAS
DB_NAME=trabalho_final_api_node
DB_COLLECTION=movies
```

Inicie a aplicação

```bash
  npm run build
```

ou em modo de desenvolvimento com o nodemon

```bash
  npm run dev
```

## Rodando testes unitários

```bash
    npm t
```

## Formatando com prettier

```bash
    npm run prettier
```
