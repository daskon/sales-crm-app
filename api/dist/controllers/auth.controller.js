"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.Login = void 0;
const auth_services_1 = require("../services/auth.services");
const authService = new auth_services_1.AuthService();
const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await authService.login(username, password);
        res.cookie("token", result.token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 10 * 60 * 1000,
        });
        res.json({ user: result.user });
    }
    catch (error) {
        res.status(500).json({ message: "Error Login", error });
    }
};
exports.Login = Login;
const Logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "none",
        });
        res.json({ message: "Logged out successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.Logout = Logout;
//# sourceMappingURL=auth.controller.js.map