import { Response } from "express";
import { BodyType } from "../../helpers";
import { Team } from "../../models";
import { errorResponse } from "../../middlewares";

export const createTeamService = async (params: BodyType, res: Response) => {
    try{
        const team = await Team.create(params);
        return team;
    }catch(e){
        console.log(e);
        return errorResponse(e, res);
    }
}