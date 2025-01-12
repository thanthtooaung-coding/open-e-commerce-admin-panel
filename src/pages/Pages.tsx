import { useState, useEffect } from 'react';
import { Search, Eye, Pencil, Trash2, Plus } from 'lucide-react';
import { PageDetails } from '../components/page/PageDetails';
import type { Page } from '../types/page';
import { EmptyState } from '../components/page/EmptyState';
import { PageForm } from '../components/page/PageForm';
import { Pagination } from '../components/ui/Pagination';
import { formatDate } from '../utils/formatDate';

export function Pages() {
    const [pages, setPages] = useState<Page[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPage, setSelectedPage] = useState<Page | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/api/v1/pages');
            
            if (!response.ok) throw new Error('Failed to fetch pages');
            
            const data: Page[] = await response.json();
            setPages(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const filteredPages = pages.filter(page =>
        page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.url.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredPages.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedPages = filteredPages.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id: number) => {
        console.log('Delete page:', id);
    };

    const handleEdit = (page: Page) => {
        console.log('Edit page:', page);
    };

    const handleAddPage = (data: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => {
        console.log('Add page:', data);
        setShowAddForm(false);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Pages
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Manage your pages and their settings
                    </p>
                </div>
                <button 
                    onClick={() => setShowAddForm(true)}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg flex items-center gap-2 hover:bg-emerald-600 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add New Page
                </button>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <input
                        type="search"
                        placeholder="Search pages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-2.5 w-full border border-gray-200 dark:border-gray-700 rounded-lg 
                            bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
                    />
                </div>
            </div>

            {loading ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
                    <div className="animate-pulse space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded" />
                        ))}
                    </div>
                </div>
            ) : error ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
                    <p className="text-red-500 text-center">{error}</p>
                </div>
            ) : paginatedPages.length > 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Image</th>
                                    <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Name</th>
                                    <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Short Name</th>
                                    <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">URL</th>
                                    <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Owner</th>
                                    <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Created At</th>
                                    <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedPages.map((page) => (
                                    <tr key={page.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="p-4">
                                            <img src={page.imageUrl} alt={page.name} className="w-10 h-10 rounded-lg object-cover" />
                                        </td>
                                        <td className="p-4 text-sm text-gray-900 dark:text-white">{page.name}</td>
                                        <td className="p-4 text-sm text-gray-900 dark:text-white">{page.shortName}</td>
                                        <td className="p-4 text-sm text-gray-900 dark:text-white">
                                            <a href={page.url} target="_blank" rel="noopener noreferrer" 
                                               className="text-blue-600 dark:text-blue-400 hover:underline">
                                                {page.url}
                                            </a>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                                    <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                                        {page.pageOwnerName.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <span className="text-sm text-gray-900 dark:text-white">
                                                    {page.pageOwnerName}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-900 dark:text-white">
                                            {formatDate(page.createdAt)}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => setSelectedPage(page)}
                                                    className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(page)}
                                                    className="p-2 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/20 rounded-lg"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(page.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            ) : (
                <EmptyState onReset={() => {
                    setSearchTerm('');
                    setCurrentPage(1);
                }} />
            )}

            {selectedPage && (
                <PageDetails
                    page={selectedPage}
                    onClose={() => setSelectedPage(null)}
                />
            )}

            {showAddForm && (
                <PageForm
                    onClose={() => setShowAddForm(false)}
                    onSubmit={handleAddPage}
                />
            )}
        </div>
    );
} 