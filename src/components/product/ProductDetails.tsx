interface ProductDetailsProps {
    product: {
        id: string;
        name: string;
        status: string;
        price: number;
        category: string;
        quantity: number;
        description?: string;
    };
    onClose: () => void;
}

export function ProductDetails({ product, onClose }: ProductDetailsProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Product Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>
                <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-500">Product ID</label>
                            <p className="font-medium">{product.id}</p>
                        </div>
                        <div>
                            <label className="text-sm text-gray-500">Name</label>
                            <p className="font-medium">{product.name}</p>
                        </div>
                        <div>
                            <label className="text-sm text-gray-500">Category</label>
                            <p className="font-medium">{product.category}</p>
                        </div>
                        <div>
                            <label className="text-sm text-gray-500">Price</label>
                            <p className="font-medium">${product.price.toFixed(2)}</p>
                        </div>
                        <div>
                            <label className="text-sm text-gray-500">Status</label>
                            <p className="font-medium">{product.status}</p>
                        </div>
                        <div>
                            <label className="text-sm text-gray-500">Quantity</label>
                            <p className="font-medium">{product.quantity}</p>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-500">Description</label>
                        <p className="font-medium">{product.description || 'No description available.'}</p>
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

