import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./config/db";
import OrderRoutes from "./routes/order.routes";
import AuthRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
          const msg = `CORS does not allow access from the specified Origin.`;
          return callback(new Error(msg), false);
        }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/orders", OrderRoutes);
app.use("/api/auth", AuthRoutes);

const PORT = process.env.PORT || 5100;
dbConnect();

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});