import mongoose from 'mongoose';
import { ICustomer } from '../../dtos';
import slugify from 'slugify';

interface ICustomerDocument extends ICustomer, Document {} 

const CustomerSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    // users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

CustomerSchema.pre('save', function(this: ICustomerDocument, next) {
    this.slug = slugify(this.name.toLowerCase());
    next();
});

export const Customer = mongoose.model<ICustomerDocument>('Customer', CustomerSchema);