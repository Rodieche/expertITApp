import mongoose, { Schema, Document } from 'mongoose';
import { ICustomer } from '../../dtos';
import slugify from 'slugify';
import { validParamsGenerator } from '../../helpers';

export interface ICustomerDocument extends Document, Omit<ICustomer, '_id'> {
    _id: mongoose.Types.ObjectId;
}

const CustomerSchema: Schema<ICustomerDocument> = new Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    state: { type: Boolean, default: true },
    image: { type: String },
    team: {
        type: Schema.Types.ObjectId,
        ref: "Team"
    }
});

export const CustomerParams = validParamsGenerator(CustomerSchema, ['state']);

CustomerSchema.methods.toJSON = function() {
    const { __v, state, ...customer } = this.toObject();
    return customer;
};

CustomerSchema.pre<ICustomerDocument>('save', function(next) {
    this.slug = slugify(this.name.toLowerCase());
    next();
});

export const Customer = mongoose.model<ICustomerDocument>('Customer', CustomerSchema);
