import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./config/db";
import OrderRoutes from "./routes/order.routes";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/orders", OrderRoutes);

const PORT = process.env.PORT || 5100;
dbConnect();

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});