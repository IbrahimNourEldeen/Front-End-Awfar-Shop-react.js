import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import productReducer from './features/productFeatures/productSlice'
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

const persistConfig = {
  key: "auth",
  storage, 
};

const persistedReducer = persistReducer(persistConfig, authReducer);


const store = configureStore({
  reducer: {
    auth: persistedReducer,
    products:productReducer
  },
});

const persistor = persistStore(store);

export default store;
export { persistor };
