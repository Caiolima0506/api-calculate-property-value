import * as fs from "fs";
import { MSPropertyValueConfig } from "../domain/helpers/MSPropertyValueConfig";


export class JsonConfig  {

    /**
     * 
     * @returns {Promise<MSPropertyValueConfig>} Configurações do micro serviço de configurações
     */
    public async mSPropertyValueConfig(){

        const resultConfig = new MSPropertyValueConfig();

        return new Promise<MSPropertyValueConfig>((resolve, reject)=>{

            this.readFile().then((jsonData:any)=>{
                
                resultConfig.Url = jsonData.MSPropertyValue.Url;
    
                resolve(resultConfig);

            }).catch((err)=>{
                return reject(err);
            });

        })
    }

    /**
     * 
     * @returns Promessa do arquivo lido.
     */
    private async readFile(){

        return new Promise((resolve, reject)=>{

            fs.readFile("appsettings.json" , "utf8", function(err, data){

                
                if(err){

                    console.log('[ERROR] Could not load "appsettings.json"');
                    return reject(err);
        
                }
                
                var jsonData = JSON.parse(data);

                resolve(jsonData);
    
            });
         
        })



    }
}