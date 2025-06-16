import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "../../../axios-setup";
import { BannerState } from "../../types/banner";

const initialState : BannerState = {
    banners: [],
    loading: false,
    error: null,
}

export const fetchBanners = createAsyncThunk("banner/fetchBanners", async (_, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.get("/api/banners");
        return response.data;
    } catch (error : any) {
        return rejectWithValue(error.response?.data || error?.message);
    }
})  

const bannerSlice = createSlice({
    name: "banner",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchBanners.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchBanners.fulfilled, (state, action) => {
            state.loading = false;
            state.banners = action.payload.banners;
        })
        .addCase(fetchBanners.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    }
})

export default bannerSlice.reducer;
