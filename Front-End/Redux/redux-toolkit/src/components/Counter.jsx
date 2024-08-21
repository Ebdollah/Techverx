import classes from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../store/index';

const Counter = () => {
  const dispatch = useDispatch(); // to modify state we use dispatch
  const counter = useSelector(state => state.counter.counter); // Generally useSelector is used for reading the data
  const showCount = useSelector(state => state.counter.showCount);

  const counterIncrease = () => {
    dispatch(counterActions.increment());
  };

  const counterDecrease = () => {
    dispatch(counterActions.decrement());
  };

  const counterCustom = () => {
    dispatch(counterActions.increase(5));
  }
  const toggleCount = () => {
    dispatch(counterActions.toggleCount());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCount && <div className={classes.value}>{counter}</div>}
      <button onClick={counterIncrease}>Increase Counter</button>
      <button onClick={counterDecrease}>Decrease Counter</button>
      <button onClick={counterCustom}>Custom Counter</button>
      <button onClick={toggleCount}>Toggle Count</button>
    </main>
  );
};

export default Counter;
