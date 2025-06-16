import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axios-setup";
import { useDispatch } from "react-redux";
import { setOffset } from "./productSlice";
import { AppDispatch } from "../../store/store";



export const fetchPopularProducts = createAsyncThunk('products/fetchPopularProducts', async (_, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.get('/api/product/popular');
        return response.data;
    } catch (error : any) {
        return rejectWithValue(error.response?.data || error?.message);
    }
});

export const fetchAllProducts = createAsyncThunk('products/fetchAllProducts', async ({ 
    offset = 0, 
    limit = 5, 
    query = "", 
    filters = {}
  }: { 
    offset?: number, 
    limit?: number, 
    query?: string, 
    filters?: object 
  }, {rejectWithValue}) => {
    try {
      const searchParam = query ? `&searchParam=${query}` : '';
      const filtersParam = Object.keys(filters).length ? `&filters=${JSON.stringify(filters)}` : '';
      
      const response = await axiosInstance.get(
        `/api/product/client/all?${searchParam}${filtersParam}&offset=${offset}&limit=${limit}`
      );
      return response.data;
    } catch (error : any) {
      return rejectWithValue(error.response?.data || error?.message);
    }
});
