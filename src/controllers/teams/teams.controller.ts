import { Request, Response } from "express";
import { paramsBuilder } from "../../helpers";
import { Team, TeamsParams } from "../../models";
import { errorResponse, successfulResponse } from "../../middlewares";
import { createTeamService, getTeamsService } from "../../services";

export const createTeam = async (req: Request, res: Response) => {
        const params = paramsBuilder(TeamsParams, req.body);
        const team = await createTeamService(params, res);
        return successfulResponse(team!, res);
}

export const showTeams = async (req: Request, res: Response) => {
    let { skip = 0, limit = 5 } = req.query;
    skip = Number(skip) | 0;
    limit = Number(limit) | 5
    const query = { state: true };
    const data = await getTeamsService(query, skip, limit, res);
    return successfulResponse(data!, res);
}

export const showTeam = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const team = await Team.findById(id).populate({
            path: 'customers',
            match: { state: true } // Filtrar clientes por estado si es necesario
        }).exec(); // Asegurarse de ejecutar la consulta
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        return successfulResponse(team, res);
    } catch (e) {
        console.log('Error searching team:', e);
        return errorResponse(e as Error, res);
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