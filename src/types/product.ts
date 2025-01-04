export interface Product {
    id: string;
    name: string;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
    price: number;
    category: string;
    quantity: number;
}

export interface SortConfig {
    key: keyof Product | null;
    direction: 'asc' | 'desc';
}

