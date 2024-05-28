import mongoose, { Schema } from 'mongoose';
import { ICustomer } from '../../dtos';
import slugify from 'slugify';
import { validParamsGenerator } from '../../helpers';

interface ICustomerDocument extends ICustomer, Document {} 

const CustomerSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    state: { type: Boolean, default: true },
    image: { type: String },
    team: {
        type: Schema.Types.ObjectId,
        ref: "Team"
    }
    // users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

export const CustomerParams = validParamsGenerator(CustomerSchema, ['state']);

CustomerSchema.methods.toJSON = function(){
    const { __v, state, ...customer } = this.toObject();
    return customer;
}

CustomerSchema.pre('save', function(this: ICustomerDocument, next) {
    this.slug = slugify(this.name.toLowerCase());
    next();
});

export const Customer = mongoose.model<ICustomerDocument>('Customer', CustomerSchema);