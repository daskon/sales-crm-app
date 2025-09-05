import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./config/db";
import OrderRoutes from "./routes/order.routes";
import AuthRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

const AllowedOrigins = [
  'https://sales-crm-app-eta.vercel.app', // your prod web
  /\.vercel\.app$/,                        // preview deploys
];

app.use(cors({
  origin: (Origin, Callback) => {
    if (!Origin) return Callback(null, true); // Postman/SSR/etc.
    const Ok = AllowedOrigins.some(O =>
      typeof O === 'string' ? O === Origin : O.test(Origin)
    );
    return Ok ? Callback(null, true)
              : Callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  
}));

// Ensure preflight is answered
app.options('*', cors());

app.use(express.json());
app.use(cookieParser());

app.use("/api/orders", OrderRoutes);
app.use("/api/auth", AuthRoutes);

const PORT = process.env.PORT || 5100;
dbConnect();

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});