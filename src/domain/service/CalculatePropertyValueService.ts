import ClaculatePropertyValueExeption from "../../exeptions/ClaculatePropertyValueExeption";
import { QuerySquareMeters } from "../helpers/QuerySquareMeters";
import { QuerySquareMetersResult } from "../helpers/QuerySquareMetersResult";
import { ResCalculateValueController } from "../helpers/ResCalculateValueController";
import { MSPropertyValueService } from "./MSPropertyValueService";

const _mSPropertyValueService = new MSPropertyValueService();

export  class CalculatePropertyValueService  {
    

    /**
     * Calcula o valor do imóvel de acordo com a quantidade de metros quadrados
     * @param cep number
     * @param squareMeters number
     * @returns {Promise<ResCalculateValueController>}
     */
    public async CalculatePropertyValue(cep:number, squareMeters: number) { 

        await this.Validate(squareMeters);
            
        return new Promise<ResCalculateValueController>((resolve, reject)=>{
 
            let querySquareMeters : QuerySquareMeters = {
                Cep : cep,
                SquareMeters : squareMeters
            };

            _mSPropertyValueService.CalculatePropertyValue(querySquareMeters).then( async (result:QuerySquareMetersResult)=>{

                let valueCalculated = await this.Calculate(squareMeters, result.Value);

                let res : ResCalculateValueController ={
                    Cep: cep,
                    PropertyValue : valueCalculated
                }

                resolve(res)

            }).catch((err)=>{
                reject(err)
            });
        })
        
    }

    /**
     * Retorna Exeption caso a quandidade de metros quadrados for maior que 10000 ou menor que 10
     * @param squareMeters 
     */
    public async Validate(squareMeters){

        if(squareMeters < 10 ){

            throw new ClaculatePropertyValueExeption("A quantidade de metros quadrados não pode ser menor que 10!");
            
        }
        
        if(squareMeters > 10000){

            throw new ClaculatePropertyValueExeption("A quantidade de metros quadrados não pode ser maior que 10.000!");
        }
        
        return;

    }

    /**
     * Multiplica o valor do metro quadrado pela quantidade de metros quadrados do imóvel
     * @param squareMeters 
     * @param valueSquareMeter 
     * @returns {number}
     */
    public async Calculate(squareMeters: number, valueSquareMeter:number){

        return  (squareMeters * valueSquareMeter);

    }
  
  }