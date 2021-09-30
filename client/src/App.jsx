import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Home from './pages/Home';
import Header from './components/nav/Header';
import SignupComplete from './pages/auth/SignupComplete';
import ForgotPassword from './pages/auth/ForgotPassword';

import { auth } from './firebase.js';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  // check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log('user', user);
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/signup/complete' component={SignupComplete} />
        <Route exact path='/forgot/password' component={ForgotPassword} />
      </Switch>
    </>
  );
};

export default App;
