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