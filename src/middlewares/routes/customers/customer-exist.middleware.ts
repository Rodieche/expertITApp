import { Customer } from "../../../models"

export const customerExist = async ( identified = '') => {
    const existCustomer = await Customer.findOne({ $or: [ { _id: identified }, { slug: identified } ] });
    if( !existCustomer ){
        throw new Error(`The customer ${identified} does not exist`);
    }
}