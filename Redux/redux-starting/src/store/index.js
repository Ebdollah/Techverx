import {legacy_createStore} from 'redux'

const counterReducer = (state = {counter : 0}, action)=>{
    switch(action.type){
        case 'INCREMENT':
            return state.counter + 1;
        case 'DECREMENT':
            return state.counter - 1;
    }
  }

const store = legacy_createStore(counterReducer);

export default store;