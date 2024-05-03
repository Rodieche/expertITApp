import { Request, Response } from "express";
import { body } from "express-validator";

export const createCustomer = (req: Request, res: Response) => {
    res.status(200).json(req.body)
}

export const showCustomers = (req: Request, res: Response) => {
    console.log(req.body);
}

export const showSingleCustomer = (req: Request, res: Response) => {
    console.log(req);
}

export const updateSingleCustomer = (req: Request, res: Response) => {
    console.log(req);
}

export const deleteSingleCustomer = (req: Request, res: Response) => {
    console.log(req);
}