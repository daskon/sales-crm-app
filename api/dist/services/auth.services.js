"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
class AuthService {
    async login(username, password) {
        const user = await user_model_1.default.findOne({ username });
        if (!user)
            throw new Error("User not found");
        const valid = await bcryptjs_1.default.compare(password, user.password);
        if (!valid)
            throw new Error("Invalid credtials");
        const token = jsonwebtoken_1.default.sign({ sub: user.id }, process.env.RAILWAY_JWT_SECRET, {
            expiresIn: "1h",
        });
        return {
            token,
            user: {
                id: user.id,
                username: user.username
            }
        };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.services.js.map