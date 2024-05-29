import { Types } from 'mongoose';
import { ICustomer } from '../customers/Customer';

export interface ITeam {
    _id?: Types.ObjectId;
    name: string;
    state: boolean;
    customers?: Types.ObjectId[] | ICustomer[];
}
