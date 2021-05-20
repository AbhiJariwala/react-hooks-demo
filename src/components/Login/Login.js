import React, {useContext, useEffect, useReducer, useState} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from "../../store/auth-context";

const initialEmailState = {value: '', isValid: null};
const initialPasswordState = {value: '', isValid: null};

const emailReducer = (state, action) => {
  if (action.type === 'EMAIL_INPUT_CHANGE') {
    return {value: action.value, isValid: action.value.includes('@')}
  }
  if (action.type === 'EMAIL_INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@')}
  }
  return state;
}

const passwordReducer = (state, action) => {
  if (action.type === 'PASSWORD_INPUT_CHANGE') {
    return {value: action.value, isValid: action.value.trim().length > 6}
  }
  if (action.type === 'PASSWORD_INPUT_BLUR') {
    return {value: state.value, isValid: state.value.trim().length > 6}
  }
  return state;
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, initialEmailState);
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, initialPasswordState);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('inside useEffect');
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);

    return () => {
      console.log('inside useEffect cleanup :');
      clearTimeout(timer);
    }
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'EMAIL_INPUT_CHANGE', value: event.target.value})
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'PASSWORD_INPUT_CHANGE', value: event.target.value});
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'EMAIL_INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'PASSWORD_INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authContext.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
