import { Response } from "express";
import { Team } from "../../models";
import { errorResponse } from "../../middlewares";

interface queryInterface {
    state: boolean;
}

export const getTeamsService = async (query: queryInterface, skip: number, limit: number, res: Response) => {
    try{
        let [teams, totalTeams] = await Promise.all([
            Team.find(query).limit(limit).skip(skip),
            Team.countDocuments(query)
        ]);
        const data = {
            teams,
            total: totalTeams
        }
        return data
    }catch(e){
        console.log(e);
        errorResponse(e, res);
    }
}