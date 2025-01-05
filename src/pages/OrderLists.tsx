import { useState } from 'react';
import { Calendar, Search, ChevronDown, X } from 'lucide-react';
import { Pagination } from '../components/ui/Pagination';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

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
    // ... (keep other orders)
];

export function OrderLists() {
    const [orders] = useState<Order[]>(initialOrders);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.orderCode.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = selectedStatus ? order.status === selectedStatus : true;

        const orderDate = new Date(order.orderedDate);
        const matchesDateRange = startDate && endDate
            ? orderDate >= startDate &&
            orderDate <= new Date(endDate.setHours(23, 59, 59, 999))
            : true;

        return matchesSearch && matchesStatus && matchesDateRange;
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
            Shipped: 'bg-purple-50 text-purple-600',
            Delivered: 'bg-emerald-50 text-emerald-600',
            Processing: 'bg-blue-50 text-blue-600',
            Cancelled: 'bg-red-50 text-red-600'
        };
        return colors[status];
    };

    const handleReset = () => {
        setSearchTerm('');
        setSelectedStatus('');
        setDateRange([null, null]);
        setCurrentPage(1);
    };

    const formatDateRange = () => {
        if (startDate && endDate) {
            return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
        }
        return 'Select date range';
    };

    const clearDateRange = () => {
        setDateRange([null, null]);
    };

    const EmptyState = () => (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12">
            <div className="flex flex-col items-center justify-center text-center">
                <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                    <Search className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No orders found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
                    We couldn't find any orders matching your search criteria. Try adjusting your filters.
                </p>
                <button
                    onClick={handleReset}
                    className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors"
                >
                    Clear all filters
                </button>
            </div>
        </div>
    );

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Orders List
                </h1>
            </div>

            <div className="space-y-4 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <input
                        type="search"
                        placeholder="Filter orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-2.5 w-full border border-gray-200 dark:border-gray-700 rounded-lg 
                            bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DatePicker
                        selectsRange={true}
                        startDate={startDate ?? undefined}
                        endDate={endDate ?? undefined}
                        onChange={(update: [Date | null, Date | null]) => setDateRange(update)}
                        isClearable={false}
                        customInput={
                            <button className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg 
                                bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                text-sm flex items-center justify-between
                                focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
                                <div className="flex items-center min-w-0">
                                    <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400 shrink-0" />
                                    <span className="ml-2 truncate">{formatDateRange()}</span>
                                </div>
                                <div className="flex items-center gap-1 ml-2 shrink-0">
                                    {startDate && endDate && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                clearDateRange();
                                            }}
                                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                                        >
                                            <X className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                                        </button>
                                    )}
                                    <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                </div>
                            </button>
                        }
                        className="w-full"
                    />

                    <div className="relative">
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg 
                                bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white 
                                focus:outline-none focus:ring-2 focus:ring-emerald-500/20 appearance-none"
                        >
                            <option value="">All Status</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Processing">Processing</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 
                            hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>

            {filteredOrders.length > 0 ? (
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

                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            ) : (
                <EmptyState />
            )}
        </div>
    );
}

