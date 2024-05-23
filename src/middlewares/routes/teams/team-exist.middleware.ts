import { Team } from "../../../models";

export const TeamExist = async ( identifier = '') => {
    const existTeam = await Team.findById(id);
    if( !existTeam ){
        throw new Error(`The team ${identifier} does not exist`);
    }
}