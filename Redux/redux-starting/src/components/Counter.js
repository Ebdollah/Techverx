import classes from './Counter.module.css';
import {useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';

const Counter = () => {
  const dispatch = useDispatch();// to modify state we use dispacth
  // const [amount, setAmount] = useState(null);

  const counter = useSelector(state => state.counter); // Generally useSelector is used for reading the data
  const showCount = useSelector(state => state.showCount);
  
  const toggleCounterHandler = () => {
    dispatch({type : 'increment'})
  };

  const toggleCounterByAmount = ()=>{
    dispatch({type : 'increase' , payload : 5});
  }

  const toggleCount=()=>{
    dispatch({type : 'toggle'});
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {/* <input value={amount} onChange={(e)=>setAmount(e.target.value)} /> //why it is not working thorugh input? */}
      {showCount && <div className={classes.value}>{counter}</div>}
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
      <button onClick={toggleCounterByAmount}>Toggle Counter by</button>
      <button onClick={toggleCount}>Toggle Count</button>

    </main>
  );
};

export default Counter;
