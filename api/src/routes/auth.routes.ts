import express, { Request, Response } from "express";
import { Login, Logout } from "../controllers/auth.controller";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express();

router.post("/login", Login);
router.post('/logout', (req, res) => Logout(req, res));
router.post("/create", async(req: Request, res: Response) => {
    const { username, password} = req.body;
    const hashPass = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        password: hashPass
    });
    res.status(201).json({
      message: "User created successfully",
      user: { id: user._id, username: user.username },
    });
});
router.get('/me', authMiddleware, (req: any, res) =>{
    res.json({user: req.user});
});

export default router;