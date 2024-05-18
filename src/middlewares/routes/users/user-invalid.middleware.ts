import { User } from "../../../models";

export const IsValidUser = async ( identifier = '') => {
    const existUser = await User.findOne({ $or: [ { _id: identifier }, { email: identifier } ] });
    if( !existUser || existUser.state ){
        throw new Error(`The user ${identifier} is not allowed`);
    }
}