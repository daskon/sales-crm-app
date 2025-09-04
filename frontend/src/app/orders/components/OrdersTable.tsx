import { Table } from "@/components/ui/table";
import { Order } from "../services/orderService";

interface OrderTblProps {
    orders: Order[];
    loading: boolean;
}

export default function OrdersTable({orders, loading}: OrderTblProps) {
    return (
        <div className="overflow-auto">
            <Table>
                <thead>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Category</th>
                    <th>Source</th>
                    <th>GEO</th>
                    <th>Date</th>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={6} className="text-center p-4">Loading...</td>
                        </tr>
                    ) : orders.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center p-4">No orders found</td>
                        </tr>
                    ) : (
                        orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customer}</td>
                                <td>{order.category}</td>
                                <td>{order.source}</td>
                                <td>{order.geo}</td>
                                <td>{order.date}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </div>
    );
}