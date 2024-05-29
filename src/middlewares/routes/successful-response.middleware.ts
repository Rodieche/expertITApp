import { Response } from "express";

export const successfulResponse = (payload: Object, res: Response) => {
    const status = 200;
    const response = {
        error: false,
        status,
        message: 'Operation successful',
        data: payload
    }
    return res.status(status).json(response);
}