import { X } from 'lucide-react';
import type { Product } from '../../types/product';

interface ProductDetailsProps {
    product: Product;
    onClose: () => void;
}

export function ProductDetails({ product, onClose }: ProductDetailsProps) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-lg mx-4">
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Product Details
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="p-4">
                    <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-4">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain p-4"
                        />
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white break-words">
                                {product.name}
                            </h3>
                            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-2
                                ${product.category === 'jewelery' ? 'bg-yellow-100 text-yellow-800' : ''}
                                ${product.category === 'electronics' ? 'bg-blue-100 text-blue-800' : ''}
                                ${product.category === `women's clothing` ? 'bg-purple-100 text-purple-800' : ''}
                                ${product.category === `men's clothing` ? 'bg-green-100 text-green-800' : ''}`
                            }>
                                {product.category}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                    ${product.price}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Quantity</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {product.quantity}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">SKU Code</p>
                                <p className="text-gray-900 dark:text-white">LDL-2024-005</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Production Date</p>
                                <p className="text-gray-900 dark:text-white">2024-07-20</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Supplier</p>
                                <p className="text-gray-900 dark:text-white">Bright Lights Ltd.</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                                <p className="text-gray-900 dark:text-white">{product.status}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

