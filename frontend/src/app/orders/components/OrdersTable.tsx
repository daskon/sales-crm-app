import { Table } from "@/components/ui/table";
import { Order } from "../services/orderService";

interface OrderTblProps {
    orders: Order[];
    loading: boolean;
}

export default function OrdersTable({orders, loading}: OrderTblProps) {
    return (
        <div className="overflow-auto border rounded-lg shadow-sm">
            <Table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Customer</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Category</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Source</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Location</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                </thead>
                <tbody className="divided-y divide-gray-200">
                    {loading ? (
                        <tr>
                            <td colSpan={6} className="text-center p-4 text-gray-500">Loading...</td>
                        </tr>
                    ) : orders.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center p-4 text-gray-500">No orders found</td>
                        </tr>
                    ) : (
                        orders.map((order, idx) => (
                            <tr key={order.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                                <td className="px-4 py-2">{order._id}</td>
                                <td className="px-4 py-2">{order.customer}</td>
                                <td className="px-4 py-2">{order.category}</td>
                                <td className="px-4 py-2">{order.source}</td>
                                <td className="px-4 py-2">{order.geo}</td>
                                <td className="px-4 py-2">{new Date(order.date).toISOString().split("T")[0]}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </div>
    );
}