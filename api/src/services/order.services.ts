import Order, { IntOrder } from "../models/order.model";

export async function getOrderList (filters: any, skip: number, limit: number) {
    const orders = await  Order.find(filters)
        .skip(skip)
        .limit(limit)
        .sort({ date: -1});

    const total = await Order.countDocuments(filters);

    return { orders, total};
}

export const createNewOrder = async (data: IntOrder): Promise<IntOrder> => {
    return Order.create(data);
}