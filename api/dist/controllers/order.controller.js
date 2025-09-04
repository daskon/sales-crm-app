"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewOrder = exports.listOrders = void 0;
const OrderServices = __importStar(require("../services/order.services"));
const listOrders = async (req, res) => {
    try {
        const { dateFrom, dateTo, category, source, geo, page = 1, limit = 10 } = req.query;
        const filters = {};
        if (dateFrom || dateTo) {
            filters.date = {};
            if (dateFrom)
                filters.date.$gte = new Date(dateFrom);
            if (dateTo)
                filters.date.$lte = new Date(dateTo);
        }
        if (category)
            filters.category = category;
        if (source)
            filters.source = source;
        if (geo)
            filters.geo = geo;
        const pageNum = parseInt(page, 10) || 1;
        const limitNum = parseInt(limit, 10) || 10;
        const skip = (pageNum - 1) * limitNum;
        const { orders, total } = await OrderServices.getOrderList(filters, skip, limitNum);
        res.json({
            data: orders,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum),
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};
exports.listOrders = listOrders;
const addNewOrder = async (req, res) => {
    try {
        const order = await OrderServices.createNewOrder(req.body);
        res.status(201).json(order);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};
exports.addNewOrder = addNewOrder;
//# sourceMappingURL=order.controller.js.map