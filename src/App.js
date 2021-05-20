import {Fragment, useContext} from "react";
import MainHeader from "./components/MainHeader/MainHeader";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import AuthContext from "./store/auth-context";

function App() {

  const authContext = useContext(AuthContext);

  return (
    <Fragment>
      <MainHeader onLogout={authContext.onLogout}/>
      <main>
        {!authContext.isLoggedIn && <Login />}
        {authContext.isLoggedIn && <Home />}
      </main>
    </Fragment>
  );
}

export default App;
