export interface Page {
    id: number;
    name: string;
    shortName: string;
    url: string;
    imageUrl: string;
    pageOwnerId: number;
    pageOwnerName: string;
    createdAt: string;
    updatedAt: string;
}

export interface PageResponse {
    content: Page[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
} 