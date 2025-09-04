import { Router } from "express";
import { listOrders, addNewOrder } from "../controllers/order.controller";

const router = Router();

router.get("/", listOrders);
router.post("/", addNewOrder);

export default router;