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