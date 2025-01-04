import { useState, useMemo, useEffect } from 'react';
import { Plus, Info, Pencil, Trash2 } from 'lucide-react';
import type { Product } from '../types/product';
import { ProductDetails } from '../components/product/ProductDetails';
import { ProductSkeleton } from '../components/product/ProductSkeleton';
import { ErrorState } from '../components/ui/ErrorState';

// const initialProducts: Product[] = [
//     {
//         id: '1',
//         name: 'Wireless Mouse',
//         status: 'In Stock',
//         price: 25.99,
//         category: 'Electronics',
//         quantity: 100,
//         image: '/product-image.jpg' // Add your image path
//     },
//     {
//         id: '2',
//         name: 'Wireless Keyboard',
//         status: 'In Stock',
//         price: 25.99,
//         category: 'Electronics',
//         quantity: 100,
//         image: '/product-image.jpg' // Add your image path
//     },
//     {
//         id: '3',
//         name: 'Gaming Keyboard',
//         status: 'In Stock',
//         price: 25.99,
//         category: 'Electronics',
//         quantity: 100,
//         image: '/product-image.jpg' // Add your image path
//     },
//     {
//         id: '4',
//         name: 'Wireless Mouse',
//         status: 'In Stock',
//         price: 25.99,
//         category: 'Electronics',
//         quantity: 100,
//         image: '/product-image.jpg' // Add your image path
//     },

//     {
//         id: '5',
//         name: 'Wireless Mouse',
//         status: 'In Stock',
//         price: 25.99,
//         category: 'Electronics',
//         quantity: 100,
//         image: '/product-image.jpg' // Add your image path
//     },
//     // ... more products
// ];



export function Products() {
    // const [products] = useState<Product[]>(initialProducts);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const filteredProducts = useMemo(() => {
        return products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    useEffect(() => {

        fetchProducts();

    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();        
            const transformedProducts: Product[] = data.map((item: any) => ({
                id: item.id.toString(),
                name: item.title,
                status: 'In Stock',
                price: item.price,
                category: item.category,
                quantity: 100,
                image: item.image,
            }));            
            setProducts(transformedProducts);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }

    };

    if (loading) {
        return (
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                    {[...Array(10)].map((_, index) => (
                        <ProductSkeleton key={index} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <ErrorState 
                message={error}
                onRetry={fetchProducts}
            />
        );
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="w-full sm:w-auto">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Products
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Manage your products and inventory
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm w-full sm:w-64"
                    />
                    <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors">
                        <Plus className="w-4 h-4" />
                        <span>Add New Product</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-3 sm:p-4">
                            <div className="aspect-square mb-3 sm:mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden group">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-200"
                                />
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 h-12">
                                {product.name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full
                                    ${product.category === 'jewelery' ? 'bg-yellow-100 text-yellow-800' : ''}
                                    ${product.category === 'electronics' ? 'bg-blue-100 text-blue-800' : ''}
                                    ${product.category === `women's clothing` ? 'bg-purple-100 text-purple-800' : ''}
                                    ${product.category === `men's clothing` ? 'bg-green-100 text-green-800' : ''}`
                                }>
                                    {product.category}
                                </span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400">
                                    ${product.price}
                                </div>
                                <div className="text-sm text-gray-800 dark:text-gray-300">
                                    Stock: {product.quantity}
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 p-2 sm:p-3 flex justify-between gap-2">
                            <button 
                                onClick={() => setSelectedProduct(product)}
                                className="flex-1 px-2 sm:px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/50 rounded-lg inline-flex items-center justify-center gap-1 transition-colors"
                            >
                                <Info className="w-4 h-4" />
                                <span className="hidden sm:inline">Details</span>
                            </button>
                            <button className="flex-1 px-2 sm:px-3 py-1.5 text-sm font-medium text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg inline-flex items-center justify-center gap-1 transition-colors">
                                <Pencil className="w-4 h-4" />
                                <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button className="flex-1 px-2 sm:px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg inline-flex items-center justify-center gap-1 transition-colors">
                                <Trash2 className="w-4 h-4" />
                                <span className="hidden sm:inline">Delete</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && !loading && !error && (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        No products found
                    </p>
                </div>
            )}

            {selectedProduct && (
                <ProductDetails
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
}
