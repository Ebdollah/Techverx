import {createSlice} from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name : 'ui',
    initialState : {cartIsVisible : false},
    reducers : {
        toggleCartVisiblity(state){
            state.cartIsVisible = !state.cartIsVisible;
        }
    }
});

export const uiAction = uiSlice.actions;
export default uiSlice.reducer;