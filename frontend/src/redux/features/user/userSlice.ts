import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser, regiterUser, logoutUser, getUser, google_signup, google_signin } from "./authThunks";
import { UserState } from "../../../redux/types/user";

const initialState: UserState = {   
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};  

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        builder.
        addCase(regiterUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(regiterUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(regiterUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            const token = action.payload.token;
            if (token) {
                AsyncStorage.setItem('token', token);
            }
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(google_signup.pending, (state) => {
            state.loading = true;
        })
        .addCase(google_signup.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            const token = action.payload.token;
            if(token){
                AsyncStorage.setItem('token', token);
            }
        })
        .addCase(google_signup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(google_signin.pending, (state) => {
            state.loading = true;
        })
        .addCase(google_signin.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            const token = action.payload.token;
            if(token){
                AsyncStorage.setItem('token', token);
            }
        })
        .addCase(google_signin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(logoutUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            AsyncStorage.removeItem("token");
            state.user = null;
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(getUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        })
        .addCase(getUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default userSlice.reducer;