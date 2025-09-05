"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const allowedOrigins = [
    "https://sales-crm-app-eta.vercel.app",
    "http://localhost:3000",
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true); // allow server-to-server requests
        if (allowedOrigins.includes(origin))
            callback(null, true);
        else
            callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
}));
app.use("/api/orders", order_routes_1.default);
app.use("/api/auth", auth_routes_1.default);
const PORT = process.env.PORT || 8080;
const dbConnect = async () => {
    if (!process.env.MONGO_URI) {
        console.error("MONGO_URI is not defined!");
        process.exit(1);
    }
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    }
    catch (err) {
        console.error("MongoDB connection refused", err);
        process.exit(1);
    }
};
dbConnect();
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
//# sourceMappingURL=server.js.map