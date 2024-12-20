import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import userReducer from "../features/userSlice";
import productReducer from "../features/productSlice";
import orderReducer from "../features/orderSlice";
import adReducer from "../features/adSlice";
import assetReducer from "../features/assetSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "product", "order"], // List of reducers to persist
};

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  order: orderReducer,
  ads: adReducer,
  assets: assetReducer,
  // Add other reducers here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
