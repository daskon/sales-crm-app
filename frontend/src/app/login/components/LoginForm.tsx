"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { userLogin } from "../services/authService";

interface LoginProps {
    onLoginSuccess: () => void;
}

export default function LoginForm({onLoginSuccess}: LoginProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await userLogin({ username, password });
            onLoginSuccess();
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <label className="block mb-4">
                Username
                <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                />
                </label>

                <label className="block mb-6">
                Password
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                />
                </label>

                <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
                </Button>
            </form>
        </div>
    );
}