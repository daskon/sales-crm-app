"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.default)();
router.post("/login", auth_controller_1.Login);
router.post('/logout', (req, res) => (0, auth_controller_1.Logout)(req, res));
router.post("/create", async (req, res) => {
    const { username, password } = req.body;
    const hashPass = await bcryptjs_1.default.hash(password, 10);
    const user = await user_model_1.default.create({
        username,
        password: hashPass
    });
    res.status(201).json({
        message: "User created successfully",
        user: { id: user._id, username: user.username },
    });
});
router.get('/me', auth_middleware_1.authMiddleware, (req, res) => {
    res.json({ user: req.user });
});
exports.default = router;
//# sourceMappingURL=auth.routes.js.map