import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createOrUpdateUser } from '../../utils/auth';

const SignupComplete = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user } = useSelector(state => ({ ...state }));

  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Email and password is required!');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      // console.log('RESULT', result);

      if (result.user.emailVerified) {
        // Remove user email from local storage
        window.localStorage.removeItem('emailForRegistration');

        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

        // redux store
        console.log('user', user, 'idTokenResult', idTokenResult);

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
          })
          .catch(error => console.log(error.message));

        // redirect
        history.push('/');
      }
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        className='mb-2 form-control'
        value={email}
        disabled
      />
      <input
        type='password'
        className='mb-2 form-control'
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder='Password'
        autoFocus
      />
      <button type='submit' className=' btn btn-outline-primary'>
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Sign Up Completion</h4>

          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default SignupComplete;
