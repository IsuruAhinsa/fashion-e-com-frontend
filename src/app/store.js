import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../pages/auth/authSlice";
import productReducer from "../pages/admin/productSlice";
import fliterReducer from "../slices/filterSlice";
import cartReducer from "../slices/cartSlice";
import checkoutReducer from "../slices/checkoutSlice";
import orderReducer from "../slices/orderSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    filter: fliterReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    order: orderReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    }
})

export default store;

