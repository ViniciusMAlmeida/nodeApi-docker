# Aula 10 - Docker

Antes de tudo garanta que você possua [Docker](https://www.docker.com/get-started) instalado em sua máquina.

## Dependencias do projeto:

npm i nodemon sequelize-cli -D

npm i express pg pg-hstore sequelize jsonwebtoken bcryptjs express-async-errors dotenv
<br><br>

## Configuração do projeto:

acessar diretório `./src/db` e rodar o comando `npx sequelize-cli init`

mudar a extensão do arquivo ./src/db/config/config.json para `.js` e exportar o
objeto de configuração

criar um arquivo `.sequelizerc` na raiz do projeto, configurar o path dos
diretórios

alterar a extensão (.json para .js) do arquivo de configuração `/src/db/models/index.js`
na linha 8, variável `config`
<br><br>

## Comandos do sequelize-cli:

criar migration
`npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string`

rodar migration
`npx sequelize-cli db:migrate`

desfazer migration
`npx sequelize-cli db:migrate:undo`


## Passos da aula

Crie um arquivo com nome `Dockerfile` na raiz do projeto. <br>
Insira as instruções para fazer o build da imagem. <br>
Rode o comando `docker build -t [nome da tag] .` <br>
- Dica: Caso crie uma tag com nome de prefixo igual ao nome do seu perfil no dockerhub, você pode fazer o push dessa imagem. Ex.: `docker build -t 623688/my-node-js:16 .` <br>

Crie um arquivo com nome `docker-compose.yml` na raiz do projeto. <br>
Insira as instruções para subir dois serviços `database` e `app`. <br>
Rode o comando `docker-compose up -d` para criar e executar os serviços.<br>
Rode o comando `docker exec node_aula npm run db:create` para criar a database.<br>
Rode o comando `docker exec node_aula npm run db:migrate` para criar as tabelas no banco de dados.<br>

## Observações

Como estamos iniciando um banco novo, é necessário criar a database e as tabelas, para facilitar criei dois scripts no arquivo `package.json`, o `db:create` e o `db:migrate`.

Como os containers rodam de forma isolada, ou seja, estão em ambientes diferentes, no arquivo `.env` na variável `DB_HOST` informe o nome do serviço utilizado para rodar o banco de dados, para que o container da aplicação consiga acessá-lo, no caso deste exemplo estou utilizando o valor `database`.

Para que o nodemon funcione (reinicie o servidor) rodando dentro do container é necessário adicionar a flag `-L` ao comando, para facilitar altere o script `npm run dev` no arquivo `package.json` para `nodemon -L ./src/server.js`

Para visualizar o console da aplicação rodando dentro do container execute o comando `docker logs -f node_aula`

Para parar os serviços execute o comando `docker-compose stop`

Para remover os serviços execute o comando `docker-compose down`