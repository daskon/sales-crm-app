import { Request, Response } from "express";
import { AuthService } from "../services/auth.services";

const authService = new AuthService();

export const Login = async (req: Request, res: Response) => {
    try{
        const {username, password} = req.body;
        const result = await authService.login(username,password);

        res.cookie("token", result.token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 10 * 60 * 1000,
        });
        res.json({user: result.user});
    } catch (error) {
        res.status(500).json({ message: "Error Login", error});
    }
}

export const Logout = async(req: Request, res: Response) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "none",
        });
        res.json({ message: "Logged out successfully" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}