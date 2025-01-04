import { DashboardStats } from '../components/dashboard/DashboardStats';
import { SalesChart } from '../components/dashboard/SalesChart';

export function Dashboard() {
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Dashboard
            </h1>
            <DashboardStats />
            <SalesChart />
        </div>
    );
}

