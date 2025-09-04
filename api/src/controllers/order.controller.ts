import { Request, Response } from "express";
import * as OrderServices from "../services/order.services";

export const listOrders = async (req: Request, res: Response) => {
    try{
        const { dateFrom, dateTo, category, source, geo, page = 1, limit = 10} = req.query;

        const filters: any = {};

        if (dateFrom || dateTo) {
            filters.date = {};
            if(dateFrom) filters.date.$gte = new Date(dateFrom as string);
            if(dateTo) filters.date.$lte = new Date(dateTo as string);
        }

        if (category) filters.category = category;
        if ( source ) filters.source = source;
        if ( geo ) filters.geo = geo;

        const pageNum = parseInt(page as string, 10) || 1;
        const limitNum = parseInt(limit as string, 10) || 10;
        const skip = (pageNum - 1) * limitNum;

        const {orders, total } = await OrderServices.getOrderList(filters, skip, limitNum);

        res.json({
            data: orders,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum),
            }
        });

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