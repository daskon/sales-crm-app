import Order, { IntOrder } from "../models/order.model";

export const getOrderList = async (filters: any): Promise<IntOrder[]> => {
    return Order.find(filters);
}

export const createNewOrder = async (data: IntOrder): Promise<IntOrder> => {
    return Order.create(data);
}