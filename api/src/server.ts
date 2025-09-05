import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import OrderRoutes from "./routes/order.routes";
import AuthRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

app.use(express.json());
app.use(cookieParser());

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

const dbConnect = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined!");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection refused", err);
    process.exit(1);
  }
};

dbConnect();

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});