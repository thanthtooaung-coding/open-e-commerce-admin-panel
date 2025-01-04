import { useState, useMemo } from 'react';
import { MoreHorizontal, ChevronDown, Plus } from 'lucide-react';
import { ProductDetails } from '../components/product/ProductDetails';
import type { Product, SortConfig } from '../types/product';

const initialProducts: Product[] = [
    {
        id: '1',
        name: 'Product 1',
        status: 'In Stock',
        price: 99.99,
        category: 'Electronics',
        quantity: 50,
    },
    {
        id: '2',
        name: 'Product 2',
        status: 'Low Stock',
        price: 149.99,
        category: 'Accessories',
        quantity: 5,
    },
];

const initialVisibleColumns = {
    name: true,
    status: true,
    price: true,
    category: true,
    quantity: true,
};

export function Products() {
    const [products] = useState<Product[]>(initialProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [visibleColumns, setVisibleColumns] = useState(initialVisibleColumns);
    const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const filteredProducts = useMemo(() => {
        return products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    const sortedProducts = useMemo(() => {
        if (!sortConfig.key) return filteredProducts;

        return [...filteredProducts].sort((a, b) => {
            if (a[sortConfig.key!] < b[sortConfig.key!]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key!] > b[sortConfig.key!]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [filteredProducts, sortConfig]);

    const handleSort = (key: keyof Product) => {
        setSortConfig({
            key,
            direction:
                sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
        });
    };

    const handleSelectAll = () => {
        if (selectedProducts.length === sortedProducts.length) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(sortedProducts.map(p => p.id));
        }
    };

    const handleSelectProduct = (id: string) => {
        setSelectedProducts(prev =>
            prev.includes(id)
                ? prev.filter(p => p !== id)
                : [...prev, id]
        );
    };

    const toggleColumn = (key: keyof typeof initialVisibleColumns) => {
        setVisibleColumns(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const copyProductId = (id: string) => {
        navigator.clipboard.writeText(id);
        setActionMenuOpen(null);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Products
                </h1>
                <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg flex items-center gap-2 hover:bg-emerald-600">
                    <Plus className="w-4 h-4" />
                    Add Product
                </button>
            </div>

            <div className="mb-4 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Filter by name..."
                    className="p-2 border rounded-lg w-80"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="relative">
                    <button
                        className="px-4 py-2 border rounded-lg flex items-center gap-2"
                        onClick={() => setActionMenuOpen(actionMenuOpen ? null : 'columns')}
                    >
                        Columns
                        <ChevronDown className="w-4 h-4" />
                    </button>
                    {actionMenuOpen === 'columns' && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border">
                            {Object.entries(visibleColumns).map(([key, value]) => (
                                <label
                                    key={key}
                                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                                >
                                    <input
                                        type="checkbox"
                                        checked={value}
                                        onChange={() => toggleColumn(key as keyof typeof initialVisibleColumns)}
                                        className="mr-2"
                                    />
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-lg border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="p-4 w-[40px]">
                                <input
                                    type="checkbox"
                                    checked={selectedProducts.length === sortedProducts.length}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            {visibleColumns.name && (
                                <th
                                    className="p-4 text-left cursor-pointer text-sm font-medium text-gray-500"
                                    onClick={() => handleSort('name')}
                                >
                                    <div className="flex items-center gap-2">
                                        Name
                                        {sortConfig.key === 'name' && (
                                            <ChevronDown
                                                className={`w-4 h-4 transform ${sortConfig.direction === 'desc' ? 'rotate-180' : ''
                                                    }`}
                                            />
                                        )}
                                    </div>
                                </th>
                            )}
                            {visibleColumns.status && (
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Status</th>
                            )}
                            {visibleColumns.price && (
                                <th
                                    className="p-4 text-left cursor-pointer text-sm font-medium text-gray-500"
                                    onClick={() => handleSort('price')}
                                >
                                    <div className="flex items-center gap-2">
                                        Price
                                        {sortConfig.key === 'price' && (
                                            <ChevronDown
                                                className={`w-4 h-4 transform ${sortConfig.direction === 'desc' ? 'rotate-180' : ''
                                                    }`}
                                            />
                                        )}
                                    </div>
                                </th>
                            )}
                            {visibleColumns.category && (
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Category</th>
                            )}
                            {visibleColumns.quantity && (
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Quantity</th>
                            )}
                            <th className="p-4 text-right text-sm font-medium text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedProducts.map((product) => (
                            <tr key={product.id} className="border-b last:border-b-0">
                                <td className="p-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.includes(product.id)}
                                        onChange={() => handleSelectProduct(product.id)}
                                    />
                                </td>
                                {visibleColumns.name && (
                                    <td className="p-4">{product.name}</td>
                                )}
                                {visibleColumns.status && (
                                    <td className="p-4">
                                        <StatusBadge status={product.status} />
                                    </td>
                                )}
                                {visibleColumns.price && (
                                    <td className="p-4">${product.price.toFixed(2)}</td>
                                )}
                                {visibleColumns.category && (
                                    <td className="p-4">{product.category}</td>
                                )}
                                {visibleColumns.quantity && (
                                    <td className="p-4">{product.quantity}</td>
                                )}
                                <td className="p-4 text-right">
                                    <div className="relative">
                                        <button
                                            onClick={() => setActionMenuOpen(actionMenuOpen === product.id ? null : product.id)}
                                            className="p-2 hover:bg-gray-100 rounded-lg"
                                        >
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                        {actionMenuOpen === product.id && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border">
                                                <button
                                                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                                                    onClick={() => copyProductId(product.id)}
                                                >
                                                    Copy product ID
                                                </button>
                                                <button
                                                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                                                    onClick={() => setSelectedProduct(product)}
                                                >
                                                    View details
                                                </button>
                                                <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                                                    Edit product
                                                </button>
                                                <button className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100">
                                                    Delete product
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="p-4 border-t flex items-center justify-between text-sm text-gray-500">
                    <span>{selectedProducts.length} of {products.length} row(s) selected</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded">
                            Previous
                        </button>
                        <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded">
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {selectedProduct && (
                <ProductDetails
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const statusMap: Record<string, string> = {
        'In Stock': 'bg-green-200 text-green-800',
        'Low Stock': 'bg-yellow-200 text-yellow-800',
        'Out of Stock': 'bg-red-200 text-red-800',
    };

    const className = statusMap[status] || 'bg-gray-200 text-gray-800';

    return (
        <span className={`px-2 py-1 rounded-md text-xs font-medium ${className}`}>
            {status}
        </span>
    );
}

