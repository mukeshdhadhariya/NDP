import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:null
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.user=action.payload
        },
        clearAuthUser: (state) => {
            state.user = null;
        }
    }
})

export const {setAuthUser,clearAuthUser}=authSlice.actions
export default authSlice.reducer