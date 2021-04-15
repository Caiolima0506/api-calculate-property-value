
import * as https from 'http';
import { JsonConfig } from '../../config/json.config';
import { QuerySquareMeters } from '../helpers/QuerySquareMeters';
import { QuerySquareMetersResult } from '../helpers/QuerySquareMetersResult';

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

            https.request(`${Url}/PropertyValue/SquareMeters?cep=${cep}`, (res: https.IncomingMessage): void => {
                res.setEncoding('utf8');
                let data = '';
                res.on('data', d => data += d);

                res.on('error', error => {
                  return reject(error)
                })
                res.on('end', () => {
        
                  data = JSON.parse(data);
        
                  if(res.statusCode === 200){
        
                    let result : QuerySquareMetersResult = {
                      Cep : data['Cep'],
                      Value : data['Value']
                    }
        
                    return resolve(result);
        
                  }else{

                    return reject(data)

                  }
        
                });
              }).end()


        })


        

    }
  
  }