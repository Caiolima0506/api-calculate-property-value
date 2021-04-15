import { CalculatePropertyValueService } from "../src/domain/service/CalculatePropertyValueService";

const calculatePropertyValueService = new CalculatePropertyValueService();

describe('Teste de Unitário do service CalculatePropertyValueService',  () => {

  it('Deve retornar o valor multiplicado Function Calculate', async () =>{

    const result = await calculatePropertyValueService.Calculate(30,5);

    expect(150).toEqual(result);

  });


  it('Deve retornar Throw para validações de metro menor que 10 e maior que 10000', async ()=>{

   
    await expect(calculatePropertyValueService.Validate(9)).rejects.toThrow("A quantidade de metros quadrados não pode ser menor que 10!");
    await expect(calculatePropertyValueService.Validate(10001)).rejects.toThrow("A quantidade de metros quadrados não pode ser maior que 10.000!");
  });

});

