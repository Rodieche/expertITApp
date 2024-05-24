import { Team } from "../../../models";

export const TeamExist = async ( id = '') => {
    const existTeam = await Team.findById(id);
    if( !existTeam ){
        throw new Error(`The team ${id} does not exist`);
    }
}