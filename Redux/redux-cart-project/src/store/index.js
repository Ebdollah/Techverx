import { configureStore } from "@reduxjs/toolkit";
import uiSlice , { uiAction } from "./ui-slice";

const store = configureStore({
    reducer : {
        ui : uiSlice,
    }
})

export default store;