
import * as https from 'http';
import { JsonConfig } from '../../config/json.config';
import { QuerySquareMeters } from '../helpers/QuerySquareMeters';
import { QuerySquareMetersResult } from '../helpers/QuerySquareMetersResult';
import  axios from 'axios';

const jsonConfig = new JsonConfig();

export  class MSPropertyValueService  {
  
    /**
     * 
     * @param cep {number} CEP do bairro de campinas
     * @returns {ResClimate} 
     */
    public async CalculatePropertyValue(squareMeters: QuerySquareMeters) { 
    
        return new Promise<QuerySquareMetersResult>((resolve, reject)=>{
            
            this.GetValueSquareMeters(squareMeters.Cep).then((resultGetValueSquareMeters : QuerySquareMetersResult)=>{

                return resolve(resultGetValueSquareMeters)

            }).catch((err)=>{

                return reject(err)

            });
        


        })
       
    }

    private async GetValueSquareMeters(cep:Number){
      
      const Url = (await jsonConfig.mSPropertyValueConfig()).Url;

        return new Promise<QuerySquareMetersResult>((resolve, reject)=>{
      
          axios.get<QuerySquareMetersResult>(`${Url}/PropertyValue/SquareMeters?cep=${cep}`).then((response: any)=>{

            let result : QuerySquareMetersResult = {
                          Cep : response.data['Cep'],
                          Value : response.data['Value']
                        }

            resolve(result);
            console.info(result)
    
          }).catch((error)=>{
            reject(error)
    
          })


        })   

    }
  
  }