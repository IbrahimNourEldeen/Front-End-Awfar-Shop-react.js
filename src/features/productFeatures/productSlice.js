import { createSlice } from "@reduxjs/toolkit";

const initialState={
    products:null
}

const productSlice=createSlice({
    name:"products",
    initialState,
    reducers:{
        AddProducts:(state,action)=>{
            state.products=action.payload
            // console.log("action payload >",action.payload)
        }
    }
})

export default productSlice.reducer;
export const {
    AddProducts
}=productSlice.actions;