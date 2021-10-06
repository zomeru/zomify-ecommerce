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
import History from './pages/user/History';
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubcategoryCreate from './pages/admin/subcategory/SubcategoryCreate';

import { auth } from './firebase.js';
import { useDispatch } from 'react-redux';
import { currentUser } from './utils/auth';

const App = () => {
  const dispatch = useDispatch();

  // check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log('user', user);

        currentUser(idTokenResult.token)
          .then(res => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch(error => console.log(error.message));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

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
        <UserRoute exact path='/user/history' component={History} />
        <UserRoute exact path='/user/password' component={Password} />
        <UserRoute exact path='/user/wishlist' component={Wishlist} />
        <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
        <AdminRoute exact path='/admin/category' component={CategoryCreate} />
        <AdminRoute
          exact
          path='/admin/category/:slug'
          component={CategoryUpdate}
        />
        <AdminRoute
          exact
          path='/admin/subcategory'
          component={SubcategoryCreate}
        />
      </Switch>
    </>
  );
};

export default App;
