import { useState } from 'react';
import { Calendar, Search, ChevronDown } from 'lucide-react';
import { Pagination } from '../components/ui/Pagination';

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
        customerName: 'Bunny',
        address: 'Yangon, Myanmar',
        image: 'https://m.media-amazon.com/images/I/71hGKP5Iq7S._AC_SL1500_.jpg',
        productName: 'Wireless Mouse',
        orderedDate: '2024-11-12T14:32:00Z',
        price: 25.99,
        quantity: 5,
        status: 'Shipped'
    },
    {
        orderCode: 'OD-2',
        customerName: 'Bunny',
        address: 'Yangon, Myanmar',
        image: 'https://m.media-amazon.com/images/I/71hGKP5Iq7S._AC_SL1500_.jpg',
        productName: 'Wireless Mouse',
        orderedDate: '2024-11-12T14:32:00Z',
        price: 25.99,
        quantity: 5,
        status: 'Shipped'
    },
    {
        orderCode: 'OD-3',
        customerName: 'Bunny',
        address: 'Yangon, Myanmar',
        image: 'https://m.media-amazon.com/images/I/71hGKP5Iq7S._AC_SL1500_.jpg',
        productName: 'Wireless Mouse',
        orderedDate: '2024-11-12T14:32:00Z',
        price: 25.99,
        quantity: 5,
        status: 'Shipped'
    },
    {
        orderCode: 'OD-4',
        customerName: 'Bunny',
        address: 'Yangon, Myanmar',
        image: 'https://m.media-amazon.com/images/I/71hGKP5Iq7S._AC_SL1500_.jpg',
        productName: 'Wireless Mouse',
        orderedDate: '2024-11-12T14:32:00Z',
        price: 25.99,
        quantity: 5,
        status: 'Shipped'
    },
    {
        orderCode: 'OD-5',
        customerName: 'Bunny',
        address: 'Yangon, Myanmar',
        image: 'https://m.media-amazon.com/images/I/71hGKP5Iq7S._AC_SL1500_.jpg',
        productName: 'Wireless Mouse',
        orderedDate: '2024-11-12T14:32:00Z',
        price: 25.99,
        quantity: 5,
        status: 'Shipped'
    },
    {
        orderCode: 'OD-6',
        customerName: 'Bunny',
        address: 'Yangon, Myanmar',
        image: 'https://m.media-amazon.com/images/I/71hGKP5Iq7S._AC_SL1500_.jpg',
        productName: 'Wireless Mouse',
        orderedDate: '2024-11-12T14:32:00Z',
        price: 25.99,
        quantity: 5,
        status: 'Shipped'
    },
    {
        orderCode: 'OD-7',
        customerName: 'Bunny',
        address: 'Yangon, Myanmar',
        image: 'https://m.media-amazon.com/images/I/71hGKP5Iq7S._AC_SL1500_.jpg',
        productName: 'Wireless Mouse',
        orderedDate: '2024-11-12T14:32:00Z',
        price: 25.99,
        quantity: 5,
        status: 'Shipped'
    },
    {
        orderCode: 'OD-8',
        customerName: 'Bunny',
        address: 'Yangon, Myanmar',
        image: 'https://m.media-amazon.com/images/I/71hGKP5Iq7S._AC_SL1500_.jpg',
        productName: 'Wireless Mouse',
        orderedDate: '2024-11-12T14:32:00Z',
        price: 25.99,
        quantity: 5,
        status: 'Shipped'
    },
    {
        orderCode: 'OD-9',
        customerName: 'Bunny',
        address: 'Yangon, Myanmar',
        image: 'https://m.media-amazon.com/images/I/71hGKP5Iq7S._AC_SL1500_.jpg',
        productName: 'Wireless Mouse',
        orderedDate: '2024-11-12T14:32:00Z',
        price: 25.99,
        quantity: 5,
        status: 'Shipped'
    },
    {
        orderCode: 'OD-10',
        customerName: 'Bunny',
        address: 'Yangon, Myanmar',
        image: 'https://m.media-amazon.com/images/I/71hGKP5Iq7S._AC_SL1500_.jpg',
        productName: 'Wireless Mouse',
        orderedDate: '2024-11-12T14:32:00Z',
        price: 25.99,
        quantity: 5,
        status: 'Shipped'
    },
    {
        orderCode: 'OD-11',
        customerName: 'Bunny',
        address: 'Yangon, Myanmar',
        image: 'https://m.media-amazon.com/images/I/71hGKP5Iq7S._AC_SL1500_.jpg',
        productName: 'Wireless Mouse',
        orderedDate: '2024-11-12T14:32:00Z',
        price: 25.99,
        quantity: 5,
        status: 'Shipped'
    },
];

export function OrderLists() {
    const [orders] = useState<Order[]>(initialOrders);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.orderCode.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = selectedStatus ? order.status === selectedStatus : true;
        
        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    const startIndex = (currentPage - 1) * ordersPerPage;
    const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getStatusColor = (status: Order['status']) => {
        const colors = {
            Shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
            Delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
            Processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
            Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
        };
        return colors[status];
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Orders List
                </h1>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Filter orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-2 w-full border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm"
                    />
                </div>
                <div className="relative">
                    <button className="px-4 py-2 w-full border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span>22 Dec, 2024 - 5 Jan, 2025</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>
                </div>
                <div className="relative">
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="px-4 py-2 w-full border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm appearance-none"
                    >
                        <option value="">All Status</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Processing">Processing</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Order Code</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Customer Name</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Address</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Image</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Product Name</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Ordered Date</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Price</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Quantity</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedOrders.map((order) => (
                                <tr key={order.orderCode} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="p-4 text-sm text-gray-900 dark:text-white">{order.orderCode}</td>
                                    <td className="p-4 text-sm text-gray-900 dark:text-white">{order.customerName}</td>
                                    <td className="p-4 text-sm text-gray-900 dark:text-white">{order.address}</td>
                                    <td className="p-4">
                                        <img src={order.image} alt={order.productName} className="w-12 h-12 rounded-lg object-cover" />
                                    </td>
                                    <td className="p-4 text-sm text-gray-900 dark:text-white">{order.productName}</td>
                                    <td className="p-4 text-sm text-gray-900 dark:text-white">
                                        {new Date(order.orderedDate).toLocaleString()}
                                    </td>
                                    <td className="p-4 text-sm text-gray-900 dark:text-white">${order.price}</td>
                                    <td className="p-4 text-sm text-gray-900 dark:text-white">{order.quantity}</td>
                                    <td className="p-4">
                                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    );
}

