import { Router, Request, Response } from 'express';
import { CalculatePropertyValueService } from '../domain/service/CalculatePropertyValueService';
import { query, validationResult } from 'express-validator';
import { ResCalculateValueController } from '../domain/helpers/ResCalculateValueController';

const router: Router = Router();

const calculatePropertyValueService = new CalculatePropertyValueService();

router.get('/', query('cep').isNumeric(), query('squareMeters').isNumeric(), async (req: Request, res: Response) => {

    const schemaErrors = validationResult(req);

    if (!schemaErrors.isEmpty()) {
        return res.status(403).send(schemaErrors.array());
    }

    let cep = Number(req.query.cep);
    let squareMeters = Number(req.query.squareMeters);

    calculatePropertyValueService.CalculatePropertyValue(cep, squareMeters).then((result:ResCalculateValueController)=>{
        
        return res.status(200).send(result);
                
    }).catch((err)=>{

        if(err && err.status){

            return res.status(err.status).send({msg:err.message});

        }else{

            return res.status(500);

        }

    });
});

export const CalculatePropertyValueController: Router = router;