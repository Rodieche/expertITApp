import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { customerRouter } from './routes';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Routes
app.use('/api/customers', customerRouter )

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});