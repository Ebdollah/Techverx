import {legacy_createStore} from 'redux'

const inditialState = {counter : 0, showCount : true}

const counterReducer = (state = inditialState, action)=>{
    // if(action.type === 'increment'){
    //     return {counter:state.counter+1}
    // }
    // if(action.type === 'decrement'){
    //     return {counter:state.counter-1}
    // }
    // return state;
    switch(action.type){
        case 'increment':
            return {counter : state.counter + 1, showCount : state.showCount};
        case 'increase':
            return {counter : state.counter + action.payload, showCount : state.showCount};
        case 'decrement':
            return {counter : state.counter - 1, showCount : state.showCount};
        case 'toggle':
            return {counter : state.counter, showCount : !state.showCount};
        default:
            return state;
    }
  }

const store = legacy_createStore(counterReducer);

export default store;