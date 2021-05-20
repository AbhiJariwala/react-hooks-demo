import {useEffect, useState} from "react";
import MainHeader from "./components/MainHeader/MainHeader";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import AuthContext from "./store/auth-context";

function App() {
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
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn}}>
      <MainHeader onLogout={logoutHandler}/>
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler}/>}
        {isLoggedIn && <Home onLogout={logoutHandler}/>}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
