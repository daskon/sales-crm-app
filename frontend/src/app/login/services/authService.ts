import axios, { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL_AUTH;

export interface LoginCred {
    username: string;
    password: string;
}

export async function userLogin(data:LoginCred) {
    try{
        const res = await axios.post(`${API_URL}/login`, data, {
            withCredentials: true,
        });
        return res.data;
    } catch (err: unknown) {
        if (err instanceof AxiosError) {
            throw err.response?.data?.message || "Login Failed";
        }
        throw "Login Failed";
    }
}

export async function me() {
    try {
        const res = await axios.get(`${API_URL}/me`, { withCredentials: true });
        return res.data.user;
    } catch {
        throw new Error("Unauthorized");
    }
}

export async function Logout() {
    try {
        const res = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
        return res.data;
    } catch {
        throw new Error("Logout failed");
    }
}