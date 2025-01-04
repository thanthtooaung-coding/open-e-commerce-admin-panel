import { Bell, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export function Header({ isSidebarOpen }: { isSidebarOpen: boolean }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <header
            className={`h-16 fixed top-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-end px-6 z-10 transition-all ${
                isSidebarOpen ? 'left-64' : 'left-0'
            }`}
        >
            <div className="flex items-center gap-4">
                <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
                <div className="flex items-center gap-3">
                    <img
                        src="https://imageio.forbes.com/specials-images/imageserve/5f8b7d5b7bfb80504e57c0b9/Suzy-Bae-stars-in--Start-Up---as-a-young-women-with-a-business-idea-but-no-funds-/0x0.png?format=png&crop=854,580,x0,y6,safe&width=960"
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                    />
                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Alvin</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
                    </div>
                </div>
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    {theme === 'light' ? (
                        <Moon className="w-5 h-5 text-gray-600" />
                    ) : (
                        <Sun className="w-5 h-5 text-gray-300" />
                    )}
                </button>
            </div>
        </header>
    );
}
