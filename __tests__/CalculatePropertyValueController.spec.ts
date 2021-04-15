
import request from 'supertest';
import { Server } from '../src/index';

describe('Teste de integração da rota /CalculatePropertyValue', () => {

  it('GET /CalculatePropertyValue', async () =>{
    await request(Server).get('/CalculatePropertyValue?cep=13025005&squareMeters=12')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect('Content-Length', '41').then(response => {

      expect(response.body).toEqual({"Cep":13025005,"PropertyValue":77948.76});
    })

  });
});

afterAll( () =>{
   Server.close();
});