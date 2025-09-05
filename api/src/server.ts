import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./config/db";
import OrderRoutes from "./routes/order.routes";
import AuthRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

// Put this BEFORE your routes/middleware
app.use(cors({
  origin: (origin, cb) => cb(null, true), // reflect any origin
  credentials: true,                       // allow cookies/Authorization
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  // omit allowedHeaders so the package echoes what the browser asks for
}));
app.options('*', cors({
  origin: (origin, cb) => cb(null, true),
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/orders", OrderRoutes);
app.use("/api/auth", AuthRoutes);

const PORT = process.env.PORT || 5100;
dbConnect();

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});