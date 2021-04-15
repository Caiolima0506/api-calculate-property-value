# REST API 

API Online
    https://api-calculate-property-value.herokuapp.com/

# Processos para inicialização 

## Instalar os pacotes 

    npm install

## Executar os testes

    npm run test

## Executar a API

    npm start

## Executar API Dev

    npm run dev

## Executar API Docker / Nodemon

    docker-compose up --build

## Documentação API - Swagger


### Request

`GET /swagger`

    http://localhost:3002/swagger


## Get calcula o valor do imóvel pela quantidade de metros quadrados

Param : cep : string
Param : squareMeters : string

### Request

`GET /CalculatePropertyValue`

     'Accept: application/json' http://localhost:3002/CalculatePropertyValue?cep=<CEP>&squareMeters=<Quantidade de Metros quadrados>

### Response

    HTTP/1.1 200 OK
    Date: Thu, 15 Apr 2021 00:16:15 GMT
    Status: 200 OK
    Connection: keep-alive
    Content-Type: application/json; charset=utf-8
    Content-Length: 50

    []

