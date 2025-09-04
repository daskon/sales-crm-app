import mongoose, { Schema, Document } from "mongoose";

export interface IntOrder extends Document {
    customer: string;
    category: string;
    date: Date;
    source: string;
    geo: string;
}

const OrderSchema: Schema = new Schema({
    customer: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    source: { type: String, required: true },
    geo: { type: String, required: true },
});

export default mongoose.model<IntOrder>("Order", OrderSchema);