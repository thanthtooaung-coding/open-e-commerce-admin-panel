import { Search } from 'lucide-react';

interface EmptyStateProps {
    onReset: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12">
            <div className="flex flex-col items-center justify-center text-center">
                <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                    <Search className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No pages found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
                    We couldn't find any pages matching your search criteria. Try adjusting your search.
                </p>
                <button
                    onClick={onReset}
                    className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors"
                >
                    Clear search
                </button>
            </div>
        </div>
    );
} 