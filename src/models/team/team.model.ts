import mongoose from 'mongoose';
import { ITeam } from '../../dtos';
import { validParamsGenerator } from '../../helpers';

interface ITeamDocument extends ITeam, Document {} 

const TeamSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true},
});

export const TeamsParams = validParamsGenerator(TeamSchema);

TeamSchema.methods.toJSON = function(){
    const { __v, ...data } = this.toObject();
    return data;
}

export const Team = mongoose.model<ITeamDocument>('Team', TeamSchema);