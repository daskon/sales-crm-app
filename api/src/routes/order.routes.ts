import { Router } from "express";
import { listOrders, addNewOrder } from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, listOrders);
router.post("/", authMiddleware, addNewOrder);

export default router;