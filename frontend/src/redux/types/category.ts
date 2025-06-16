export type Category = {
    id: string;
    name: string;
    image: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

export interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: string | null;
}

