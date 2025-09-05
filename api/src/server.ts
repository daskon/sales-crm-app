import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./config/db";
import OrderRoutes from "./routes/order.routes";
import AuthRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

const allowedOrigins = [
  "https://sales-crm-app-eta.vercel.app",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow server-to-server requests
      if (allowedOrigins.includes(origin)) callback(null, true);
      else callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  })
);

app.use("/api/orders", OrderRoutes);
app.use("/api/auth", AuthRoutes);

const PORT = process.env.PORT || 5100;
dbConnect();

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});