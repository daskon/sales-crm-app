import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export class AuthService {

    async login (username: string, password: string) {

        const user = await User.findOne({ username });
        if(!user) throw new Error("User not found");

        const valid = await bcrypt.compare(password, user.password);
        if(!valid) throw new Error("Invalid credtials");

        const token = jwt.sign({ sub: user.id }, process.env.RAILWAY_JWT_SECRET!, {
            expiresIn: "1h",
        });

        return {
            token,
            user:{
                id: user.id,
                username: user.username
            }
        };
    }
}