import React, {useEffect, useState} from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {}
});

export const AuthContextProvider = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    localStorage.setItem('isAuthenticated', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isAuthenticated');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    console.log('inside use effect');
    setIsLoggedIn(localStorage.getItem('isAuthenticated') === '1');
  }, [])

  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler}}>{props.children}</AuthContext.Provider>
  );
}

export default AuthContext;
