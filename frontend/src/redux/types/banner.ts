import { Category } from './category';

export type Banner = {
    id: string;
    bannerImage: string;
    category: string | Category; // Can be either the category ID or the full Category object
    createdAt: string;
    updatedAt: string;
}

export interface BannerState {
    banners: Banner[];
    loading: boolean;
    error: string | null;
}

