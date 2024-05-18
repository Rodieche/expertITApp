import { Customer } from "../../../models"

export const IsValidCustomer = async ( identified = '') => {
    const existCustomer = await Customer.findOne({ $or: [ { _id: identified }, { slug: identified } ] });
    if( !existCustomer || !existCustomer.state ){
        throw new Error(`The customer ${identified} is not valid`);
    }
}