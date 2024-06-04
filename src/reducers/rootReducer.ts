import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import userReducer from "../features/userSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // List of reducers to persist
};

const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
