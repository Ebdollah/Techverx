import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {legacy_createStore} from 'redux';

//Store --Globalized State

//Action
const increment = ()=>{
  return{
    type : 'INCREMENT'
  };
}
const decrement = ()=>{
  return{
    type : 'DECREMENT'
  };
}

const counter = (state = 0, action)=>{
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

let store = legacy_createStore(counter);
store.subscribe(()=>console.log(store.getState()));

//Dispatch
store.dispatch(increment());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
