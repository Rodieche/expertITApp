import { IUser } from "..";

export interface ICustomer{
    id?: any;
    name: string;
    users?: IUser[];
} 