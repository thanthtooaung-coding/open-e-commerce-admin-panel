export type Product = {
    id: string;
    name: string;
    status: string;
    price: number;
    category: string;
    quantity: number;
    image: string;
    skuCode?: string;
    productionDate?: string;
    supplier?: string;
};

export interface SortConfig {
    key: keyof Product | null;
    direction: 'asc' | 'desc';
}

