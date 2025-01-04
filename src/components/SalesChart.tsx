import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const data = [
    { name: 'Jan', value: 590 },
    { name: 'Feb', value: 580 },
    { name: 'Mar', value: 750 },
    { name: 'Apr', value: 400 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 600 },
    { name: 'Jul', value: 700 },
    { name: 'Aug', value: 300 },
    { name: 'Sep', value: 200 },
    { name: 'Oct', value: 100 },
    { name: 'Nov', value: 100 },
    { name: 'Dec', value: 400 },
];

export function SalesChart() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
                Sales Details
            </h3>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                            dataKey="value"
                            fill="#10B981"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

