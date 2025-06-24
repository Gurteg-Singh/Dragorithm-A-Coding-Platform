import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./userSlices/authSlice.js";

const stores = configureStore({
    reducer:{
        auth : authReducer
    }
});

export default stores;