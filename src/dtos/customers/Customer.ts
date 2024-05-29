import { Types } from 'mongoose';

export interface ICustomer {
    _id?: Types.ObjectId;
    name: string;
    slug: string;
    state: boolean;
    image?: string;
    team?: Types.ObjectId;
}
