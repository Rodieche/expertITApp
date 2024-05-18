import { User } from "../../../models";

export const UserExist = async ( identifier = '') => {
    const existUser = await User.findOne({ $or: [ { _id: identifier }, { email: identifier } ] });
    if( !existUser ){
        throw new Error(`The user ${identifier} does not exist`);
    }
}