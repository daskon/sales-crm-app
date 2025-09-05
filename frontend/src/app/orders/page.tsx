"use client";
import { useEffect, useState } from "react";
import { fetchOrders, Order } from "./services/orderService";
import Filters from "./components/Filters";
import OrdersTable from "./components/OrdersTable";
import { CSVLink } from "react-csv";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

export default function OrderPage() {
    const [filters, setFilters] = useState({});
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 1});

    useEffect(()=>{
        setLoading(true);
        fetchOrders({...filters, page: pagination.page, limit: pagination.limit})
            .then((res) =>{
                setOrders(res.data);
                setPagination(res.pagination);
            })
            .finally(() => setLoading(false));
    }, [filters, pagination.page, pagination.limit]);

    const chartData = Object.values(
        orders.reduce((acc, order) => {
            if (!acc[order.category]) acc[order.category] = { category: order.category, count: 0 };
            acc[order.category].count +=1;
            return acc;
        }, {} as Record<string, { category: string; count: number}>)
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">List of Orders</h1>

            <Filters filters={filters} setFilters={setFilters} />

            <div className="mb-4">
                <CSVLink data={orders} filename="orders.csv">
                    <Button>Export CSV</Button>
                </CSVLink>
            </div>

            <OrdersTable orders={orders} loading={loading} />

            <div className="flex justify-between items-center mt-4">
                <Button
                  variant="outline"
                  disabled={pagination.page === 1}
                  onClick={() => setPagination((p) => ({ ...p, page: p.page - 1}))}
                >
                    Previous
                </Button>

                <span>
                    Page {pagination.page} of {pagination.totalPages}
                </span>

                <Button
                  variant="outline"
                  disabled={pagination.page === pagination.totalPages}
                  onClick={() => setPagination((p) => ({ ...p, page: p.page + 1}))}
                >
                    Next
                </Button>
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2">Orders Summary</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#4f46e5" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}