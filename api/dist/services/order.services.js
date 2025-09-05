"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewOrder = void 0;
exports.getOrderList = getOrderList;
const order_model_1 = __importDefault(require("../models/order.model"));
async function getOrderList(filters, skip, limit) {
    const orders = await order_model_1.default.find(filters)
        .skip(skip)
        .limit(limit)
        .sort({ date: -1 });
    const total = await order_model_1.default.countDocuments(filters);
    return { orders, total };
}
const createNewOrder = async (data) => {
    return order_model_1.default.create(data);
};
exports.createNewOrder = createNewOrder;
//# sourceMappingURL=order.services.js.map