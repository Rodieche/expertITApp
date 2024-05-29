import mongoose, { Schema, Document } from 'mongoose';
import { ITeam } from '../../dtos';
import { validParamsGenerator } from '../../helpers';
import { Customer } from '../customers/Customer.model';

interface ITeamDocument extends Document, Omit<ITeam, '_id'> {
    _id: mongoose.Types.ObjectId;
}

const TeamSchema: Schema<ITeamDocument> = new Schema({
    name: { type: String, required: true, unique: true },
    state: { type: Boolean, default: true },
    customers: [{
        type: Schema.Types.ObjectId,
        ref: "Customer"
    }]
});

export const TeamsParams = validParamsGenerator(TeamSchema);

TeamSchema.pre<ITeamDocument>('save', function(next) {
    const words = this.name.split(' ');
    const lastWord = words[words.length - 1];
    if (lastWord !== 'Team') {
        this.name += ' Team';
    }
    next();
});

TeamSchema.methods.toJSON = function() {
    const { __v, state, ...data } = this.toObject();
    return data;
};

export const Team = mongoose.model<ITeamDocument>('Team', TeamSchema);
