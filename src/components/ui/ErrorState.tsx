import { AlertCircle, RefreshCcw } from 'lucide-react';

interface ErrorStateProps {
    message: string;
    onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
    return (
        <div className="p-6 flex flex-col items-center justify-center min-h-[400px]">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full text-center shadow-sm border border-gray-200 dark:border-gray-700">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Something went wrong
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {message}
                </p>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    >
                        <RefreshCcw className="w-4 h-4" />
                        Try Again
                    </button>
                )}
            </div>
        </div>
    );
} 