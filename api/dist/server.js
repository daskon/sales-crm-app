"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:3000"];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = `CORS does not allow access from the specified Origin.`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/orders", order_routes_1.default);
app.use("/api/auth", auth_routes_1.default);
const PORT = process.env.PORT || 5100;
(0, db_1.dbConnect)();
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
//# sourceMappingURL=server.js.map