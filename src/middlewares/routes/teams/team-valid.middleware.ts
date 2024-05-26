import { Team } from "../../../models"

export const IsValidTeam = async ( id = '') => {
    const existTeam = await Team.findById(id);
    if( !existTeam || !existTeam.state ){
        throw new Error(`The team  ${id} is not valid`);
    }
}