import mongoose, { Document } from "mongoose";
export interface IntOrder extends Document {
    customer: string;
    category: string;
    date: Date;
    source: string;
    geo: string;
}
declare const _default: mongoose.Model<IntOrder, {}, {}, {}, mongoose.Document<unknown, {}, IntOrder, {}, {}> & IntOrder & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=order.model.d.ts.map