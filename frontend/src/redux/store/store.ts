import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import productReducer from "../features/products/productSlice";
import categoryReducer from "../features/categories/categorySlice";
import bannerReducer from "../features/banners/bannerSlice";

const rootReducer = combineReducers({   
  user: userReducer,
  product: productReducer,  
  category: categoryReducer,
  banner: bannerReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;