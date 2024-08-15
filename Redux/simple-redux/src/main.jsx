import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {legacy_createStore} from 'redux';
import allReducers from './reducers/index.js';
import {Provider} from 'react-redux'

// //Store --Globalized State

//Action
// const increment = ()=>{
//   return{
//     type : 'INCREMENT'
//   };
// }
// const decrement = ()=>{
//   return{
//     type : 'DECREMENT'
//   };
// }

// const counterReducer = (state = 0, action)=>{
//   switch(action.type){
//       case 'INCREMENT':
//           return state + 1;
//       case 'DECREMENT':
//           return state - 1;
//   }
// }


// const store = legacy_createStore(counterReducer);
const store = legacy_createStore(allReducers);
// store.subscribe(()=>console.log(store.getState()));

//Dispatch
// store.dispatch(increment());

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
