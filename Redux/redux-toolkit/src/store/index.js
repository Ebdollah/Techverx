import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialCounterState = { counter: 0, showCount: true };
const initialAuthState = {isAuthenticated : false}

const counterSlice = createSlice({
    name: 'counter',
    initialState : initialCounterState,
    reducers: {
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action){
            state.counter = state.counter + action.payload;
        },
        toggleCount(state) {
            state.showCount = !state.showCount;
        }
    }
});

const authSlice = createSlice({
    name : 'authentication',
    initialState : initialAuthState,
    reducers:{
        login(state){
            state.isAuthenticated = true;
        },
        logout(state){
            state.isAuthenticated = false;
        },
    }
})

const store = configureStore({
    reducer: {counter : counterSlice.reducer, auth : authSlice.reducer}
});

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

export default store;
