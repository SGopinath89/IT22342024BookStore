// Importing the configureStore function from Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";

// Importing the auth reducer
import authReducer from "./auth";

// Configuring the Redux store
const store = configureStore({
    
    // Specifying the root reducer for the store
    reducer: {
        auth: authReducer,
    },
});

// Exporting the configured store to be used in the application
export default store;