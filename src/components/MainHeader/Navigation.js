import React, {useContext} from 'react';

import classes from './Navigation.module.css';
import AuthContext from "../../store/auth-context";

const Navigation = (props) => {
  /* using auth context consume to use context values */
  /*return (
    <AuthContext.Consumer>
      {(authContext) => {
        return (
          <nav className={classes.nav}>
            <ul>
              {authContext.isLoggedIn && (
                <li>
                  <a href="/">Users</a>
                </li>
              )}
              {authContext.isLoggedIn && (
                <li>
                  <a href="/">Admin</a>
                </li>
              )}
              {authContext.isLoggedIn && (
                <li>
                  <button onClick={props.onLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        )
      }}
    </AuthContext.Consumer>
  );*/

  /* using useContext hook to use context values */

  const authContext = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {authContext.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {authContext.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {authContext.isLoggedIn && (
          <li>
            <button onClick={authContext.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
