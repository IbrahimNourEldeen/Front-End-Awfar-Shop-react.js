import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isAuthenticated: false,
    customer: null,
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login(state,action){
            state.isAuthenticated=true;
            state.customer=action.payload.customer
            console.log(">>>>>>>>>",action.payload.customer)
        },
        logout(state,action){
            state.isAuthenticated=false;
            state.customer=null
        }
    }
})

export const {login,logout} =authSlice.actions;
export default authSlice.reducer;