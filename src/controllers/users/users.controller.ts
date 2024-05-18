import { Request, Response } from "express"
import { paramsBuilder } from "../../helpers"
import { User, UsersParams } from "../../models"
import { errorResponse, successfulResponse } from "../../middlewares";

export const createUser = async (req: Request, res: Response) => {
    try{
        const params = paramsBuilder(UsersParams, req.body);
        const user = await User.create(params);
        successfulResponse(user, res);
    }catch(e){
        console.log('Error creating user');
        errorResponse(e as ErrorEvent, res);
    }
}

export const showUsers = async (req:Request, res: Response) => {
    try{
        const { skip = 0, limit = 5 } = req.query;
        const query = { state: true };
        const [users, totalUsers] = await Promise.all([
            User.find(query).limit(Number(limit)).skip(Number(skip)),
            User.countDocuments(query)
        ]);
        const data = {
            users,
            total: totalUsers
        }
        return successfulResponse(data, res);
    }catch(e){
        console.log('Error showing Users');
        errorResponse(e as ErrorEvent, res);
    }
}

export const showUser = async (req: Request, res: Response) => {
    const { email } = req.params;
    try{
        const user = await User.findOne({ email });
        if(!user || !user.state){
            const status = 404;
            const response = {
                error: true,
                status,
                message: 'User not found'
            }
            return res.status(status).json(response);
        }
        return successfulResponse(user, res);
    }catch(e){
        console.log('Error creating user');
        errorResponse(e as ErrorEvent, res);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try{
        const { email:id } = req.params;
        const params = paramsBuilder(UsersParams, req.body);
        const user = await User.findByIdAndUpdate(id, params, { new: true });
        return successfulResponse(user!, res);
    }catch(e){
        console.log('Error updating user');
        errorResponse(e as ErrorEvent, res);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try{
        const { email:id } = req.params;
        const user = await User.findById(id);
        user!.state = false;
        user!.save();
        return successfulResponse({}, res);
    }catch(e){{
        console.log('Error deleting user');
        errorResponse(e as ErrorEvent, res);
    }}
}