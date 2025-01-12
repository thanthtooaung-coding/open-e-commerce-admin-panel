import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    ClipboardList,
    Box,
    CheckSquare,
    Contact,
    FileText,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
} from 'lucide-react';

const menuItems = [
    { path: '/', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/products', name: 'Products', icon: Package },
    { path: '/order-lists', name: 'Order Lists', icon: ClipboardList },
    { path: '/pages', name: 'Pages', icon: Box },
    { path: '/owners', name: 'Owners', icon: Users },    
    { path: '/to-do', name: 'To-Do', icon: CheckSquare },
    { path: '/contact', name: 'Contact', icon: Contact },
    { path: '/invoice', name: 'Invoice', icon: FileText },    
    { path: '/settings', name: 'Settings', icon: Settings },
];

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const location = useLocation();

    const toggleSidebar = () => setIsOpen((prev) => !prev);

    return (
        <>
            {/* Mobile Hamburger Menu */}
            <button
                className={`fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md lg:hidden ${isOpen ? 'hidden' : 'block'}`}
                onClick={toggleSidebar}
            >
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                } z-50 w-64 lg:w-64`}
            >
                <div className="p-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">
                        <span className="text-emerald-500">Admin</span>
                        <span className="text-gray-900 dark:text-white">Dash</span>
                    </h1>
                    {/* Close Button */}
                    <button
                        className="p-2 rounded-lg hover:bg-gray-200 shadow-md dark:hover:bg-gray-700 lg:hidden"
                        onClick={toggleSidebar}
                    >
                        <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>
                </div>
                <nav className="px-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center px-4 py-3 mb-1 rounded-lg transition-colors ${
                                    location.pathname === item.path
                                        ? 'bg-emerald-500 text-white'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            >
                                <Icon className="w-5 h-5 mr-3" />
                                {item.name}
                            </Link>
                        );
                    })}
                    <button className="flex items-center px-4 py-3 mb-1 rounded-lg w-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                    </button>
                </nav>
            </aside>

            {/* Overlay for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
}
