import { JsonConfig } from '../../config/json.config';
import { QuerySquareMeters } from '../helpers/QuerySquareMeters';
import { QuerySquareMetersResult } from '../helpers/QuerySquareMetersResult';
import  axios from 'axios';

const jsonConfig = new JsonConfig();

export  class MSPropertyValueService  {
  
    /**
     * busca o valor do metro quadrado pelo CEP
     * @param squareMeters QuerySquareMeters quantidade de metros e cep
     * @returns {Promise<QuerySquareMetersResult>}
     */
    public async CalculatePropertyValue(squareMeters: QuerySquareMeters) { 
    
      return new Promise<QuerySquareMetersResult>((resolve, reject)=>{
          
        this.GetValueSquareMeters(squareMeters.Cep).then((resultGetValueSquareMeters : QuerySquareMetersResult)=>{

          return resolve(resultGetValueSquareMeters)

        }).catch((err)=>{

          return reject(err);

        });
      });
    }

    /**
     * Retorna o valor do metro quadrado pelo CEP através da API "api-meter-value-per-zip-code"
     * @param cep number
     * @returns {Promise<QuerySquareMetersResult>}
     */
    private async GetValueSquareMeters(cep:Number){
      
      const Url = (await jsonConfig.mSPropertyValueConfig()).Url;

      return new Promise<QuerySquareMetersResult>((resolve, reject)=>{
    
        axios.get<QuerySquareMetersResult>(`${Url}/PropertyValue/SquareMeters?cep=${cep}`).then((response: any)=>{

          let result : QuerySquareMetersResult = {
                        Cep : response.data['Cep'],
                        Value : response.data['Value']
                      }

          resolve(result);
  
        }).catch((error)=>{

          reject(error)

        })

      });   
    }

  }