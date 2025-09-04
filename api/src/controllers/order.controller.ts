import { Request, Response } from "express";
import * as OrderServices from "../services/order.services";

export const listOrders = async (req: Request, res: Response) => {
    try{
        const { date, category, source, geo} = req.query;
        const filters: any = {};
        if (date) filters.date = date;
        if (category) filters.category = category;
        if ( source ) filters.source = source;
        if ( geo ) filters.geo = geo;

        const orders = await OrderServices.getOrderList(filters);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error});
    }
}

export const addNewOrder = async (req: Request, res: Response) => {
    try{
        const order = await OrderServices.createNewOrder(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error});
    }
}