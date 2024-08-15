import { authActions } from '../store';
import classes from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';


const Header = () => {
  const dispatch = useDispatch();
  const toggleLogUser = useSelector(state => state.auth.isAuthenticated);
  const logoutHandle = () => {
    dispatch(authActions.logout());
  }
  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {toggleLogUser && (<nav>
        <ul>
          <li>
            <a href='/'>My Products</a>
          </li>
          <li>
            <a href='/'>My Sales</a>
          </li>
          <li>
            <button onClick={logoutHandle}>Logout</button>
          </li>
        </ul>
      </nav>)}
    </header>
  );
};

export default Header;
