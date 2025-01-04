import { Users, Package, DollarSign, Clock } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string;
    change: {
        value: number;
        type: 'increase' | 'decrease';
        period: string;
    };
    icon: React.ReactNode;
}

function StatCard({ title, value, change, icon }: StatCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
                    <h3 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
                        {value}
                    </h3>
                </div>
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    {icon}
                </div>
            </div>
            <div className="mt-4 flex items-center">
                <span
                    className={`text-sm ${change.type === 'increase'
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}
                >
                    {change.type === 'increase' ? '↑' : '↓'} {Math.abs(change.value)}%
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                    {change.period}
                </span>
            </div>
        </div>
    );
}

export function DashboardStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
                title="Total User"
                value="40,689"
                change={{ value: 8.5, type: 'increase', period: 'Up from yesterday' }}
                icon={<Users className="w-6 h-6 text-blue-500" />}
            />
            <StatCard
                title="Total Order"
                value="10,293"
                change={{ value: 1.3, type: 'increase', period: 'Up from past week' }}
                icon={<Package className="w-6 h-6 text-yellow-500" />}
            />
            <StatCard
                title="Total Sales"
                value="$89,000"
                change={{ value: 4.3, type: 'decrease', period: 'Down from yesterday' }}
                icon={<DollarSign className="w-6 h-6 text-green-500" />}
            />
            <StatCard
                title="Total Pending"
                value="$2,040"
                change={{ value: 1.1, type: 'increase', period: 'Up from yesterday' }}
                icon={<Clock className="w-6 h-6 text-orange-500" />}
            />
        </div>
    );
}

