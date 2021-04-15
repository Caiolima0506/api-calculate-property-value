import ClaculatePropertyValueExeption from "../../exeptions/ClaculatePropertyValueExeption";
import { QuerySquareMeters } from "../helpers/QuerySquareMeters";
import { QuerySquareMetersResult } from "../helpers/QuerySquareMetersResult";
import { ResCalculateValueController } from "../helpers/ResCalculateValueController";
import { MSPropertyValueService } from "./MSPropertyValueService";

const _mSPropertyValueService = new MSPropertyValueService();

export  class CalculatePropertyValueService  {
    
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

    private async Validate(squareMeters){

        if(squareMeters < 10 ){

            throw new ClaculatePropertyValueExeption("A quantidade de metros quadrados não pode ser menor que 10!");
            
        }
        
        if(squareMeters > 10000){

            throw new ClaculatePropertyValueExeption("A quantidade de metros quadrados não pode ser maior que 10.000!");
        }
  

    }

    private async Calculate(squareMeters: number, valueSquareMeter:number){

        return  (squareMeters * valueSquareMeter);

    }
  
  }