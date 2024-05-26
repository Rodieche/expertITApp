import mongoose from 'mongoose';
import { ITeam } from '../../dtos';
import { validParamsGenerator } from '../../helpers';

interface ITeamDocument extends ITeam, Document {} 

const TeamSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    state: { type: Boolean, default: true }
});

export const TeamsParams = validParamsGenerator(TeamSchema);

TeamSchema.pre('save', function(this: ITeamDocument, next) {
    const words = this.name.split(' ');
    const lastWord = words[words.length - 1];
    if(lastWord !== 'Team'){
        this.name += ' Team'
    }
    next();
});

TeamSchema.methods.toJSON = function(){
    const { __v, state, ...data } = this.toObject();
    return data;
}

export const Team = mongoose.model<ITeamDocument>('Team', TeamSchema);