import express from 'express';
import * as bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../src/swagger.json'
import { CalculatePropertyValueController } from './controllers/CalculatePropertyValueController';

enum ExitStatus {
    Failure = 1,
    Success = 0,
  }

const app: express.Application = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Rotas para Controllers
 */
app.use('/swagger', swaggerUi.serve,swaggerUi.setup(swaggerDocument));
app.use('/CalculatePropertyValue', CalculatePropertyValueController);


process.on('unhandledRejection', (reason, promise) => {

    throw reason;
});

process.on('uncaughtException', (error) => {
   
    process.exit(ExitStatus.Failure);
});

const port = process.env.PORT || 3002;

export const Server = app.listen(port, () => {

    console.log(`Listening at http://localhost:${port}/`);
});




