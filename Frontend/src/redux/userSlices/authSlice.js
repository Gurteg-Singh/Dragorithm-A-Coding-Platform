import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import axiosClient from "../../utils/axiosClient";

export const registerUser = createAsyncThunk(
    'auth/register',
    async(userData,thunkAPI)=>{
        try{
            const response = await axiosClient.post('/user/register',userData);
            return response.data.user;
        }catch(err){
            const message = err.response?.data?.message || 'Something went wrong';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/login',
    async(userData,thunkAPI)=>{
        try{
            const response = await axiosClient.post('/user/login',userData);
            return response.data.user;
        }catch(err){
            const message = err.response?.data?.message || 'Something went wrong';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const checkUser = createAsyncThunk(
    'auth/check',
    async(_,thunkAPI)=>{
        try{
            const response = await axiosClient.get('/user/check');
            return response.data.user;
        }catch(err){
            const message = err.response?.data?.message ||  'Something went wrong';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const logOutUser = createAsyncThunk(
    'auth/logOut',
    async(_,thunkAPI)=>{
        try{
            const response = await axiosClient.post('/user/logOut');
            return null;
        }catch(err){
            const message = err.response?.data || err.message || 'Something went wrong';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

const authSlice = createSlice({
    name : 'auth',
    initialState : {
        user : null,
        isAuthenticated : false,
        error : null,
        loading : false
    },
    reducers : {
        clearAuthError: (state) => {
            state.error = null;
        }
    },
    extraReducers : (builder)=>{
        builder
        .addCase(registerUser.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.user = action.payload,
            state.isAuthenticated = !!action.payload,
            state.loading = false
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading = false,
            state.isAuthenticated = false,
            state.error = action.payload
        })

        //login
        .addCase(loginUser.pending,(state,action)=>{
            state.loading = true;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
            state.loading = false;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        })
        //logout
        .addCase(logOutUser.pending,(state,action)=>{
            state.loading = true;
        })
        .addCase(logOutUser.fulfilled,(state,action)=>{
            state.user = null;
            state.isAuthenticated = !!action.payload;
            state.loading = false;
            state.error = null;
        })
        .addCase(logOutUser.rejected,(state,action)=>{
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        })
        //check
        .addCase(checkUser.pending,(state,action)=>{
            state.loading = true;
        })
        .addCase(checkUser.fulfilled,(state,action)=>{
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
            state.loading = false;
        })
        .addCase(checkUser.rejected,(state,action)=>{
            state.loading = false;
            state.isAuthenticated = false;
        })
    }
})

const authReducer = authSlice.reducer;
export const { clearAuthError } = authSlice.actions;
export default authReducer;


