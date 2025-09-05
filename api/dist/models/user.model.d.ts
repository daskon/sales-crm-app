import mongoose, { Document } from "mongoose";
export interface IntUser extends Document {
    username: string;
    password: string;
}
declare const _default: mongoose.Model<IntUser, {}, {}, {}, mongoose.Document<unknown, {}, IntUser, {}, {}> & IntUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=user.model.d.ts.map