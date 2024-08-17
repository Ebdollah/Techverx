import { configureStore } from "@reduxjs/toolkit";
import studentSlice from './features/studentSlice';
import { studentApi } from "./features/studentApi";


const store = configureStore({
    reducer : {
        [studentApi.reducerPath] : studentApi.reducer
    },
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(studentApi.middleware)
}) 

export default store;