import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    
    const getVisiblePages = () => {
        if (totalPages <= 7) return pages;
        
        if (currentPage <= 4) {
            return [...pages.slice(0, 5), '...', totalPages];
        }
        
        if (currentPage >= totalPages - 3) {
            return [1, '...', ...pages.slice(totalPages - 5)];
        }
        
        return [
            1,
            '...',
            currentPage - 1,
            currentPage,
            currentPage + 1,
            '...',
            totalPages
        ];
    };

    return (
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                        text-gray-700 bg-white border border-gray-300
                        dark:text-gray-200 dark:bg-gray-800 dark:border-gray-700
                        disabled:opacity-50 disabled:cursor-not-allowed
                        hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                    Previous
                </button>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                        text-gray-700 bg-white border border-gray-300
                        dark:text-gray-200 dark:bg-gray-800 dark:border-gray-700
                        disabled:opacity-50 disabled:cursor-not-allowed
                        hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        Showing page <span className="font-medium">{currentPage}</span> of{' '}
                        <span className="font-medium">{totalPages}</span>
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2
                                text-gray-400 bg-white border border-gray-300
                                dark:text-gray-400 dark:bg-gray-800 dark:border-gray-700
                                disabled:opacity-50 disabled:cursor-not-allowed
                                hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        
                        {getVisiblePages().map((page, index) => (
                            <button
                                key={index}
                                onClick={() => typeof page === 'number' ? onPageChange(page) : undefined}
                                disabled={page === '...'}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium
                                    ${page === currentPage
                                        ? 'z-10 bg-emerald-500 text-white focus:z-20'
                                        : 'text-gray-700 bg-white border border-gray-300 dark:text-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }
                                    ${page === '...' ? 'cursor-default' : ''}
                                `}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2
                                text-gray-400 bg-white border border-gray-300
                                dark:text-gray-400 dark:bg-gray-800 dark:border-gray-700
                                disabled:opacity-50 disabled:cursor-not-allowed
                                hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
} 