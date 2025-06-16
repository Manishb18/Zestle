type UnitType = "piece" | "gm" | "kg" | "ml" | "ltr" | "kl";
type DiscountType = "fixed" | "percentage";

export type Product = {
    id: string;
    name: string;
    description: string; 
    price: number;
    image: string;
    category: {
        id: string;
        name: string;
        slug: string;
    }; 
    units: UnitType;
    stock: number; 
    discount: number; 
    discountType: DiscountType;
    isPopular: boolean; 
}

export interface ProductState {
    products: Product[];
    popularProducts: Product[];
    offset: number;
    hasMore : boolean;
    limit: number;
    total: number;
    loading: boolean;
    error: string | null;
    hideTabBar: boolean;
    searchString: string;
    filters : {
        category : string;
        price : string;
        rating : string;
        discount : string;
        sort : string;
    }
}
