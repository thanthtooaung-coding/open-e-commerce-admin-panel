import { X } from 'lucide-react';
import type { Page } from '../../types/page';
import { formatDate } from '../../utils/formatDate';

interface PageDetailsProps {
    page: Page;
    onClose: () => void;
}

export function PageDetails({ page, onClose }: PageDetailsProps) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-lg mx-4">
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Page Details
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="p-4">
                    <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-4">
                        <img
                            src={page.imageUrl}
                            alt={page.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {page.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {page.shortName}
                            </p>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                <span className="text-lg font-medium text-emerald-600 dark:text-emerald-400">
                                    {page.pageOwnerName.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {page.pageOwnerName}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Page Owner
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">URL</p>
                                <a href={page.url} target="_blank" rel="noopener noreferrer"
                                   className="text-blue-600 dark:text-blue-400 hover:underline">
                                    {page.url}
                                </a>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Created At</p>
                                <p className="text-gray-900 dark:text-white">
                                    {formatDate(page.createdAt)}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Last Updated</p>
                                <p className="text-gray-900 dark:text-white">
                                    {formatDate(page.updatedAt)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 