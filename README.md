## Desafio do Cidade Alta

API de emblemas que permite resgatar, mostrar inventário e retorna lista com filtros de nome e paginação.
Desenvolvida com NestJS no padrão RESTFUL e Swagger, implementado para a documentação de todas os endpoints.

## Instalação

1. Instale as dependências
```bash
$ npm install
```
2. Instale o banco de dados **cidadealtadb.sql** usando o método de preferência. 


## Rodar o aplicativo 

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Para testar, pode use utilizar o Swagger em http://localhost:3000/api
Alguns Bearer tokens simples para utilização : 1919463, 5107163 e 3027849(ADMIN)
## Rotas

- /emblems/list
- /emblems/inventory
- /emblems/redeem
- /emblems/equip
- /emblems/new