import mongoose from 'mongoose';
import { IUser } from '../../dtos';
import { validParamsGenerator } from '../../helpers';

interface IUserDocument extends IUser, Document {} 

const UserSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true},
    state: { type: Boolean, default: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, required: true, default: 'USER_ROLE' }
    // users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

export const UsersParams = validParamsGenerator(UserSchema, ['role', 'state']);

UserSchema.methods.toJSON = function(){
    const { __v, state, ...user } = this.toObject();
    return user;
}

export const User = mongoose.model<IUserDocument>('Customer', UserSchema);