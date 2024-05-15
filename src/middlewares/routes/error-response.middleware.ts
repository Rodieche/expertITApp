import { Response } from "express";

export const errorResponse = (error: ErrorEvent, res: Response) => {
    const status = 500;
    const response = {
        error: true,
        status,
        message: error.message
    }
    return res.status(status).json(response);
}