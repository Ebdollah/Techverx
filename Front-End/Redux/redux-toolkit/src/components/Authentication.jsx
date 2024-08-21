import classes from './Auth.module.css';
import { authActions } from '../store';
import { useSelector, useDispatch } from 'react-redux';


const Authentication = () => {
  const dispatch = useDispatch();
  const showComponent = (e) => {
    e.preventDefault();

    dispatch(authActions.login());
  }

  return (
    <main className={classes.auth}>
      <section>
        {/* <form onSubmit={showComponent}>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' />
          </div>
        </form> */}
          <button onClick={showComponent}>Login</button>
      </section>
    </main>
  );
};

export default Authentication;
