import { Request, Response } from "express";
import { Customer, CustomerParams } from "../../models";
import { errorResponse, successfulResponse } from "../../middlewares";
import { paramsBuilder } from "../../helpers";

export const createCustomer = async (req: Request, res: Response) => {
    const params = paramsBuilder(CustomerParams, req.body);
    try{
        const customer = await Customer.create(params);
        return successfulResponse(customer, res);
    }catch(e){
        console.log('Error on Customer creation');
        return errorResponse(e as ErrorEvent, res);
    }
    
    
}

export const showCustomers = async (req: Request, res: Response) => {
    const { skip = 0, limit = 5 } = req.query;
    const query = { state: true };
    try{
        const [customers, totalCustomers] = await Promise.all([
            Customer.find(query).limit(Number(limit)).skip(Number(skip)),
            Customer.countDocuments(query)
        ]);
        const data = {
            customers,
            total: totalCustomers
        }
        return successfulResponse(data, res);
    }catch(e){
        console.log('Error on Customers');
        return errorResponse(e as ErrorEvent, res);
    }
}

export const showSingleCustomer = async (req: Request, res: Response) => {
    const { slug } = req.params;
    try{
        const customer = await Customer.findOne({ slug: slug });
        return successfulResponse(customer!, res);
    }catch(e){
        console.log('Error on search single customer');
        return errorResponse(e as ErrorEvent, res);
    }
}

export const updateSingleCustomer = async (req: Request, res: Response) => {
    
    try{
        const { slug:id } = req.params;
        const params = paramsBuilder(CustomerParams, req.body);   
        const customer = await Customer.findByIdAndUpdate(id, params, { new: true });
        return successfulResponse(customer!, res);
    }catch(e){
        console.log('Error on update customer');
        return errorResponse(e as ErrorEvent, res);
    }
}

export const deleteSingleCustomer = async (req: Request, res: Response) => {
    try{
        const { slug:id } = req.params;
        let customer = await Customer.findById(id);
        customer!.state = false;
        customer!.save();
        return successfulResponse({}, res)
    }catch(e){
        console.log('Error deleting customer');
        return errorResponse(e as ErrorEvent, res);
    }
    
}