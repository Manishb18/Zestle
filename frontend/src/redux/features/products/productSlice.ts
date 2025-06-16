import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductState } from "../../types/product";
import { fetchPopularProducts, fetchAllProducts } from "./productThunks";

const initialState: ProductState = {
    products: [],
    popularProducts: [],
    offset: 0,
    limit: 6,
    hasMore : true,
    total: 0,
    loading: false,
    error: null,
    hideTabBar: false,
    searchString: '',
    filters :{
        category : '',
        price : '',
        rating : '',
        discount : '',
        sort : '',
    }
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setHideTabBar: (state, action: PayloadAction<boolean>) => {
            state.hideTabBar = action.payload;
        },
        setOffset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
        },
        setFilters: (state, action: PayloadAction<{category : string, price : string, rating : string, discount : string, sort : string}>) => {
            state.filters = action.payload;
        },
        resetProducts: (state) => {
            state.products = [];
            state.offset = 0;
            state.total = 0;
        },
        setSearchString: (state, action: PayloadAction<string>) => {
            state.searchString = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchPopularProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchPopularProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.popularProducts = action.payload.products;
        })
        .addCase(fetchPopularProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(fetchAllProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
            const { products, totalCount } = action.payload;
            state.loading = false;
            state.total = totalCount;
            state.hasMore = state.offset + products.length < totalCount;
            state.products = state.offset === 0 ? products : [...state.products, ...products];
            state.offset += products.length;  // Update the offset for the next fetch
        })
        .addCase(fetchAllProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    },
});

export const {setOffset, resetProducts, setSearchString, setHideTabBar, setFilters} = productSlice.actions;
export default productSlice.reducer;
