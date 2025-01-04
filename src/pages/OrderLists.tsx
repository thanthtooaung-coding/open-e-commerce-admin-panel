import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Order {
    orderCode: string;
    customerName: string;
    address: string;
    image: string;
    productName: string;
    orderedDate: string;
    price: number;
    quantity: number;
    status: 'Shipped' | 'Delivered' | 'Processing' | 'Cancelled';
}

const initialOrders: Order[] = [
    {
        orderCode: 'OD-1',
        customerName: 'John Doe',
        address: 'New York, USA',
        image: '/placeholder.svg',
        productName: 'Wireless Mouse',
        orderedDate: '2024-11-12T14:32:00Z',
        price: 25.99,
        quantity: 5,
        status: 'Shipped'
    },
    {
        orderCode: 'OD-2',
        customerName: 'Jane Smith',
        address: 'London, UK',
        image: '/placeholder.svg',
        productName: 'Bluetooth Speaker',
        orderedDate: '2024-11-10T10:25:00Z',
        price: 45.50,
        quantity: 3,
        status: 'Delivered'
    },
    // ... (add more orders as needed)
];

export function OrderLists() {
    const [orders] = useState<Order[]>(initialOrders);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateRange, setDateRange] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('');

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'Shipped':
                return 'text-purple-600 bg-purple-50';
            case 'Delivered':
                return 'text-emerald-600 bg-emerald-50';
            case 'Processing':
                return 'text-blue-600 bg-blue-50';
            case 'Cancelled':
                return 'text-red-600 bg-red-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Orders Lists</h1>

            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Filter order..."
                    className="p-2 border rounded-lg flex-1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="21 Dec, 2024 - 4 Jan, 2025"
                    className="p-2 border rounded-lg w-64"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                />

                <div className="relative">
                    <button className="px-4 py-2 border rounded-lg flex items-center gap-2">
                        Status
                        <ChevronDown className="w-4 h-4" />
                    </button>
                </div>

                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    Reset
                </button>
            </div>

            <div className="bg-white rounded-lg border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="p-4 text-left text-sm font-medium text-gray-500">Order Code</th>
                            <th className="p-4 text-left text-sm font-medium text-gray-500">Customer Name</th>
                            <th className="p-4 text-left text-sm font-medium text-gray-500">Address</th>
                            <th className="p-4 text-left text-sm font-medium text-gray-500">Image</th>
                            <th className="p-4 text-left text-sm font-medium text-gray-500">Product Name</th>
                            <th className="p-4 text-left text-sm font-medium text-gray-500">Ordered Date</th>
                            <th className="p-4 text-left text-sm font-medium text-gray-500">Price</th>
                            <th className="p-4 text-left text-sm font-medium text-gray-500">Quantity</th>
                            <th className="p-4 text-left text-sm font-medium text-gray-500">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.orderCode} className="border-b last:border-b-0">
                                <td className="p-4">{order.orderCode}</td>
                                <td className="p-4">{order.customerName}</td>
                                <td className="p-4">{order.address}</td>
                                <td className="p-4">
                                    <img src={order.image} alt={order.productName} className="w-12 h-12 rounded" />
                                </td>
                                <td className="p-4">{order.productName}</td>
                                <td className="p-4">{new Date(order.orderedDate).toLocaleString()}</td>
                                <td className="p-4">${order.price.toFixed(2)}</td>
                                <td className="p-4">{order.quantity}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

