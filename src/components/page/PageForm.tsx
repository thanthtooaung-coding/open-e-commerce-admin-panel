import { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import type { Page } from '../../types/page';
import type { Owner } from '../../types/owner';

interface PageFormProps {
    onClose: () => void;
    onSubmit: (data: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export function PageForm({ onClose, onSubmit }: PageFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        shortName: '',
        url: '',
        imageUrl: '',
        pageOwnerId: 0,
        pageOwnerName: ''
    });
    const [owners, setOwners] = useState<Owner[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchOwners();
    }, []);

    const fetchOwners = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/api/v1/page-owners');
            
            if (!response.ok) throw new Error('Failed to fetch owners');
            
            const data: Owner[] = await response.json();
            setOwners(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleOwnerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOwner = owners.find(owner => owner.id === Number(e.target.value));
        if (selectedOwner) {
            setFormData(prev => ({
                ...prev,
                pageOwnerId: selectedOwner.id,
                pageOwnerName: selectedOwner.name
            }));
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-lg mx-4">
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Add New Page
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-4">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg 
                                    bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm
                                    focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Short Name
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.shortName}
                                onChange={(e) => setFormData(prev => ({ ...prev, shortName: e.target.value }))}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg 
                                    bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm
                                    focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                URL
                            </label>
                            <input
                                type="url"
                                required
                                value={formData.url}
                                onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg 
                                    bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm
                                    focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Image URL
                            </label>
                            <input
                                type="url"
                                required
                                value={formData.imageUrl}
                                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg 
                                    bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm
                                    focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Page Owner
                            </label>
                            <div className="relative">
                                <select
                                    required
                                    value={formData.pageOwnerId || ''}
                                    onChange={handleOwnerChange}
                                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg 
                                        bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm
                                        focus:outline-none focus:ring-2 focus:ring-emerald-500/20 appearance-none"
                                    disabled={loading}
                                >
                                    <option value="">Select an owner</option>
                                    {owners.map(owner => (
                                        <option key={owner.id} value={owner.id}>
                                            {owner.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                </div>
                            </div>
                            {error && (
                                <p className="mt-1 text-sm text-red-500">
                                    {error}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                                hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 
                                rounded-lg hover:bg-emerald-600 transition-colors"
                            disabled={loading}
                        >
                            Create Page
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 