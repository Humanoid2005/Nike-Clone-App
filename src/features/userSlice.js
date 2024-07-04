import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

function isPresent(item,array){
    for(var i=0;i<array.length;i++){
        if(array[i].url==item.url && array[i].imageUrl==item.imageUrl && array[i].productName==item.productName && array[i].listPrice==item.listPrice && array[i].description==item.description){
            return true;
        }
    }
    return false;
}

export const register = createAsyncThunk("user/register",async (userData,thunkAPI)=>{
    try{
        const response = await axios.post("http://api.realworld.io/api/users",{user:userData});
        console.log(response);
        return response.data.user;
    }
    catch(err){
        return thunkAPI.rejectWithValue(err.response.data.errors);
    }
});

export const getCurrentUser = createAsyncThunk("user/getCurrentUser",async (_,thunkAPI)=>{
    try{
        const token = localStorage.getItem("accessToken") ?? "";
        const response = await axios.get("http://api.realworld.io/api/user",{
            headers:{
                Authorization: `Token ${token}`
            }
        });
        return response.data.user;
    }
    catch(err){
        return thunkAPI.rejectWithValue(err.response.data.errors);
    }
});

export const login = createAsyncThunk("user/login",async (userData,thunkAPI)=>{
    try{
        const response = await axios.post("http://api.realworld.io/api/users/login",{user:userData});
        return response.data.user;
    }
    catch(err){
        return thunkAPI.rejectWithValue(err.response.data.errors);
    }
});

export const logout = createAsyncThunk("user/logout",async ()=>{
    localStorage.removeItem("accessToken");
})

export const userSlice = createSlice({
    name:"user",
    initialState:{
        user:{
            username:"",
            email:"",
            password:"",
            loggedIn:false,
            favourite:[],
            cart:[]
        },
    },
    reducers:{
        addfavourite: (state,action)=>{
            if(isPresent(action.payload,state.user.favourite)==false){
                state.user.favourite.push(action.payload);
            }
        },
        removefavourite: (state,action)=>{
            const idx = state.user.favourite.findIndex((item)=>(item.url==action.payload.url));
            state.user.favourite.splice(idx,1);
        },
        addcart: (state,action)=>{
            if(isPresent(action.payload,state.user.cart)==false){
                state.user.cart.push(action.payload);
            }
        },
        removecart: (state,action)=>{
            const idx = state.user.cart.findIndex((item)=>(item.url==action.payload.url));
            state.user.cart.splice(idx,1);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(register.pending,(state)=>{
                console.log("pending");
            })
            .addCase(register.fulfilled,(state,action)=>{
                console.log("fulfilled");
                state.user.username = action.payload.username;
                state.user.email = action.payload.email;
                state.user.password = action.payload.password;
                state.user.cart = [];
                state.user.favourite = [];
                state.user.loggedIn = true;
            })
            .addCase(register.rejected,(state)=>{
                console.log("rejected");
            })
            .addCase(login.pending,(state)=>{
                console.log("pending");
            })
            .addCase(login.fulfilled,(state,action)=>{
                console.log("fulfilled");
                state.user.username = action.payload.username;
                state.user.email = action.payload.email;
                state.user.password = action.payload.password;
                state.user.cart = [];
                state.user.favourite = [];
                state.user.loggedIn = true;
            })
            .addCase(login.rejected,(state)=>{
                console.log("rejected");
            })
            .addCase(getCurrentUser.pending,(state)=>{
                console.log("pending");
            })
            .addCase(getCurrentUser.fulfilled,(state,action)=>{
                console.log("fulfilled");
                state.user.username = action.payload.username;
                state.user.email = action.payload.email;
                state.user.password = action.payload.password;
                state.user.cart = [];
                state.user.favourite = [];
                state.user.loggedIn = true;
            })
            .addCase(getCurrentUser.rejected,(state)=>{
                console.log("rejected");
                state.user = {
                    username:"",
                    email:"",
                    password:"",
                    loggedIn:false,
                    favourite:[],
                    cart:[]
                };
            })
            .addCase(logout.fulfilled,(state)=>{
                console.log("rejected");
                state.user = {
                    username:"",
                    email:"",
                    password:"",
                    loggedIn:false,
                    favourite:[],
                    cart:[]
                };
            })
    }
})

export const {addfavourite,removefavourite,addcart,removecart} = userSlice.actions;
export const selectUser = (state)=>state.user.user;
export default userSlice.reducer;