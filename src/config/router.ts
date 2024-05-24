import { Application } from "express";
import { customerRouter, teamRouter, userRouter } from "../routes";

export const router = (app: Application) => {
    app.use('/api/customers', customerRouter );
    app.use('/api/users', userRouter);
    app.use('/api/teams', teamRouter);
}