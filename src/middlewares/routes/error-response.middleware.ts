import { Response } from "express";

export const errorResponse = (error: ErrorEvent | any, res: Response) => {
    const status = 500;
    const response = {
        error: true,
        status,
        message: error?.message || error
    }
    return res.status(status).json(response);
}