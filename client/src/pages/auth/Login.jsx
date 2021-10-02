import React, { useState, useEffect } from 'react';
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrUpdateUser } from '../../utils/auth';

const Login = ({ history }) => {
  const [email, setEmail] = useState('zomerzxc.19@gmail.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector(state => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push('/');
    }
  }, [user]);

  const dispatch = useDispatch();

  const roleBasedRedirect = res => {
    if (res.data.role === 'admin') {
      history.push('/admin/dashboard');
    } else {
      history.push('/user/history');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
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
          roleBasedRedirect(res);
        })
        .catch(error => console.log(error.message));

      // history.push('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async result => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
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
            roleBasedRedirect(res);
          })
          .catch(error => console.log(error.message));
        // history.push('/');
      })
      .catch(error => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        className='mb-2 form-control'
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder='Your email'
        autoFocus
      />
      <input
        type='password'
        className='mb-2 form-control'
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder='Your password'
      />
      <Button
        onClick={handleSubmit}
        type='submit'
        className='mb-3'
        block
        shape='round'
        icon={<MailOutlined />}
        size='large'
        disabled={!email || password.length < 6}
      >
        Login with Email
      </Button>
    </form>
  );

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          {!loading ? <h4>Log in</h4> : <h4>Loading...</h4>}
          {loginForm()}
          <Button
            onClick={handleGoogleLogin}
            type='danger'
            className='mb-3'
            block
            shape='round'
            icon={<GoogleOutlined />}
            size='large'
          >
            Login with Google
          </Button>
          <Link to='/forgot/password' className='float-end text-danger'>
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
