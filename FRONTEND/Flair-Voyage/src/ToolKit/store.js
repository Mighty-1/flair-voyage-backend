import { configureStore} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import authReducer from "./authSlice";
import searchReducer from "./searchSlice";
import wishlistReducer from "./wishlistSlice";


// Redux Persist configuration
const persistConfig = {
  key: "root", // The key used in local storage
  storage, // Use local storage to persist state
};

// Combine multiple reducers into one root reducer
const rootReducer = combineReducers({
  auth: authReducer, // Authentication reducer
  search: searchReducer, // Search reducer
  wishlist: wishlistReducer, // Wishlist reducer
});

// Create a persisted reducer using persistConfig
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Ignore persist actions to prevent warnings
      },
    }),
});

// Create persistor instance to manage persistence
export const persistor = persistStore(store);

// Export the store for use in the app
export default store;
