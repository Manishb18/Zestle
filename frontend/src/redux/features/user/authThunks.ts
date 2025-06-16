import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axios-setup";
import { User } from "../../../redux/types/user";

//Thunks for authentication
export const regiterUser = createAsyncThunk('user/register', async (user: User, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.post('/api/auth/register', user);
        return response.data;
    } catch (error : any) {
        return rejectWithValue( error.response?.data || error?.message);
    }
});

export const loginUser = createAsyncThunk('user/login', async (user: {phone: string, password: string}, {rejectWithValue}) => {
    try {
        console.log('====================================');
        console.log(user);
        console.log('====================================');
        const response = await axiosInstance.post('/api/auth/signin', user);
        console.log('====================================');
        console.log("response",response);
        console.log('====================================');
        console.log(response.data);
        return response.data;
    } catch (error : any) {
        return rejectWithValue( error.response?.data || error?.message);
    }
});

export const logoutUser = createAsyncThunk('user/logout', async (_, {rejectWithValue}) => {
    try {
        await axiosInstance.post('/api/auth/logout');
        return true;
    } catch (error : any) {
        return rejectWithValue( error.response?.data || error?.message);
    }
});

export const getUser = createAsyncThunk('user/getUser', async (_, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.get('/api/user/getUser');
        return response.data;
    } catch (error : any) {
        return rejectWithValue( error.response?.data || error?.message);
    }
});


//google signin and signup
export const google_signup = createAsyncThunk('user/google_signup', async (token : string, {rejectWithValue}) => {
    try {
        console.log("In signup thunk!")
        const response = await axiosInstance.post('/api/auth/google_signup', {token});
        return response.data;
    } catch (error : any) {
        return rejectWithValue( error.response?.data || error?.message);
    }
});

export const google_signin = createAsyncThunk('user/google_signin', async (token : string, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.post('/api/auth/google_signin', {token});
        return response.data;
    } catch (error : any) {
        return rejectWithValue( error.response?.data || error?.message);
    }
});