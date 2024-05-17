import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { customerRouter } from '../routes';

import { envs } from '../plugins/envs.plugin';
import { MongoDatabase } from './';

export class Server{

    app: Application = express();
    port = process.env.PORT || 8000;

    constructor(){
        this.config();
        this.middlewares();
        this.routes();
        this.start();
    }

    config(){
        dotenv.config();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.json());
    }

    routes(){
        this.app.use('/api/customers', customerRouter );
    }

    async start(){
        await MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        });

        this.app.listen(this.port, () => {
            console.log(`Server is Fire at http://localhost:${this.port}`);
        });
    }

}






//Routes


