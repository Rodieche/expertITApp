import { NextFunction, Request, Response } from "express";
import { Customer } from "../../models";
import { MyRequest } from "../../dtos";
import { errorResponse, successfulResponse } from "../../middlewares";

export const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    console.log(name);
    try{
        const customer = await Customer.create({name});
        return successfulResponse(customer, res);
    }catch(e){
        console.log('Error on Customer creation');
        return errorResponse(e as ErrorEvent, res);
    }
    
    
}

export const showCustomers = (req: Request, res: Response) => {
    console.log(req.body);
}

export const showSingleCustomer = async (req: Request, res: Response) => {
    const { slug } = req.params;
    console.log(slug);
    try{
        const customer = await Customer.find({ slug: slug });
        if(!customer){
            const status = 404;
            const response = {
                error: true,
                status,
                message: 'Customer not found'
            }
            return res.status(status).json(response);
        }
        return successfulResponse(customer, res);
    }catch(e){
        console.log('Error on search single customer');
        return errorResponse(e as ErrorEvent, res);
    }
}

export const updateSingleCustomer = (req: Request, res: Response) => {
    console.log(req);
}

export const deleteSingleCustomer = (req: Request, res: Response) => {
    console.log(req);
}