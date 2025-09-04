import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Order {
    _id: string;
    customer: string;
    category: string;
    date: string;
    source: string;
    geo: string;
}

export interface OrderResponse {
    data: Order[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }
}

export interface FetchOrdersFilters {
    category?: string;
    source?: string;
    geo?:string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
}

export async function fetchOrders(
    filters: FetchOrdersFilters = {}
): Promise<OrderResponse> {
    const { data } = await axios.get(API_URL!, {params: filters});
    return data;
}