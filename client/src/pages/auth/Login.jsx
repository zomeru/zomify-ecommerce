import React, { useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

const Login = ({ history }) => {
  const [email, setEmail] = useState('zomerzxc.19@gmail.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push('/');
    } catch (error) {
      console.log(error);
      console.log(error.message);
      setLoading(false);
    }
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
          <h4>Log in</h4>

          {loginForm()}
        </div>
      </div>
    </div>
  );
};

export default Login;
