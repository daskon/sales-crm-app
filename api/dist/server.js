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
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/orders", order_routes_1.default);
const PORT = process.env.PORT || 5100;
(0, db_1.dbConnect)();
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
//export default app;
//# sourceMappingURL=server.js.map