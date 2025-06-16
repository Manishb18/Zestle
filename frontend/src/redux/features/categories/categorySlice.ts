import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "../../../axios-setup";
import { CategoryState } from "../../types/category";

const initialState : CategoryState= {
    categories: [],
    loading: false,
    error: null,
}

export const fetchCategories = createAsyncThunk("category/fetchCategories", async (_, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.get("/api/categories");
        console.log("categories", response.data);
        return response.data;
    } catch (error : any) {
        return rejectWithValue(error.response?.data || error?.message);
    }
})
const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCategories.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload as string;
        })
    }
})

export default categorySlice.reducer;