export function ProductSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
            <div className="p-3">
                <div className="aspect-square mb-3 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2" />
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 p-3 flex justify-between gap-2">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded flex-1" />
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded flex-1" />
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded flex-1" />
            </div>
        </div>
    );
} 