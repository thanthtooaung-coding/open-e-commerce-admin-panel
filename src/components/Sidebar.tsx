import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ClipboardList, Box, CheckSquare, Contact, FileText, Users, Settings, LogOut } from 'lucide-react';

const menuItems = [
    { path: '/', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/products', name: 'Products', icon: Package },
    { path: '/order-lists', name: 'Order Lists', icon: ClipboardList },
    { path: '/product-stock', name: 'Product Stock', icon: Box },
    { path: '/to-do', name: 'To-Do', icon: CheckSquare },
    { path: '/contact', name: 'Contact', icon: Contact },
    { path: '/invoice', name: 'Invoice', icon: FileText },
    { path: '/team', name: 'Team', icon: Users },
    { path: '/settings', name: 'Settings', icon: Settings },
];

export function Sidebar() {
    const location = useLocation();

    return (
        <aside className="w-64 min-h-screen bg-white fixed left-0 top-0">
            <div className="p-6">
                <h1 className="text-2xl font-bold">
                    <span className="text-emerald-500">Admin</span>
                    <span>Dash</span>
                </h1>
            </div>
            <nav className="px-4">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-4 py-2.5 mb-1 rounded-lg transition-colors ${isActive
                                    ? 'bg-emerald-500 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.name}
                        </Link>
                    );
                })}
                <button className="flex w-full items-center px-4 py-2.5 mb-1 rounded-lg text-gray-600 hover:bg-gray-100">
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                </button>
            </nav>
        </aside>
    );
}

