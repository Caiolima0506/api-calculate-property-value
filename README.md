# REST API 



# Processos para inicialização 

## Instalar os pacotes 

    npm install

## Executar os testes

    npm run test

## Executar a API

    npm start

## Executar Api Dev

    npm run dev


## Documentação API - Swagger


### Request

`GET /swagger`

    http://localhost:3002/swagger


## Get Calcula o valor do Imóvel pela quantidade de metros quadrados

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

