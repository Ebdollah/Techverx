import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {legacy_createStore} from 'redux';
import allReducers from './reducers/index.js';
import {Provider} from 'react-redux'

// //Store --Globalized State

// //Action
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
