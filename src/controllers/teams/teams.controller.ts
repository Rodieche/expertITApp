import { Request, Response } from "express";
import { paramsBuilder } from "../../helpers";
import { Team, TeamsParams } from "../../models";
import { errorResponse, successfulResponse } from "../../middlewares";

export const createTeam = async (req: Request, res: Response) => {
    try{

        const params = paramsBuilder(TeamsParams, req.body);
        const team = await Team.create(params);
        return successfulResponse(team, res);
    }catch(e){
        console.log('Error on Team creation');
        return errorResponse(e as ErrorEvent, res);
    }
}

export const showTeams = async (req: Request, res: Response) => {
    const { skip = 0, limit = 5 } = req.query;
    const query = { state: true };
    try{
        const [customers, totalCustomers] = await Promise.all([
            Team.find(query).limit(Number(limit)).skip(Number(skip)),
            Team.countDocuments(query)
        ]);
        const data = {
            customers,
            total: totalCustomers
        }
        return successfulResponse(data, res);
    }catch(e){
        console.log('Error on Team creation');
        return errorResponse(e as ErrorEvent, res);
    }
}

export const showTeam = async (req: Request, res: Response) => {
    const { id } = req.params;
    try{
        const team = await Team.findById(id)
        return successfulResponse(team!, res);
    }catch(e){
        console.log('Error searching team');
        return errorResponse(e as ErrorEvent, res);
    }
}

export const updateTeam = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const params = paramsBuilder(TeamsParams, req.body);   
        const team = await Team.findByIdAndUpdate(id, params, { new: true });
        return successfulResponse(team!, res);
    }catch(e){
        console.log('Error on updating Team');
        return errorResponse(e as ErrorEvent, res);
    }
}

export const deleteTeam = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        let team = await Team.findById(id);
        team!.state = false;
        team!.save();
        return successfulResponse({}, res)
    }catch(e){
        console.log('Error deleting team');
        return errorResponse(e as ErrorEvent, res);
    }
}