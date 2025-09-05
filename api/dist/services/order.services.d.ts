import { IntOrder } from "../models/order.model";
export declare function getOrderList(filters: any, skip: number, limit: number): Promise<{
    orders: (import("mongoose").Document<unknown, {}, IntOrder, {}, {}> & IntOrder & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[];
    total: number;
}>;
export declare const createNewOrder: (data: IntOrder) => Promise<IntOrder>;
//# sourceMappingURL=order.services.d.ts.map