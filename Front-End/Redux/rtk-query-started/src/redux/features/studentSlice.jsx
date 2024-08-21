import { createSlice } from "@reduxjs/toolkit";


const initialAppState = {title : 'Welcome'}

const studentSlice = createSlice({
    name : 'app',
    initialState : initialAppState,
    reducer : {}
})


export default studentSlice.reducer;


