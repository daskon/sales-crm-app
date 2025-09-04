import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./config/db";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
dbConnect();

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});