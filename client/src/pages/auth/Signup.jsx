import React, { useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';

const Signup = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const config = {
      url: import.meta.env.VITE_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete the registration.`
    );

    // save user email in local storage
    window.localStorage.setItem('emailForRegistration', email);

    // clear state
    setEmail('');
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        className='mb-2 form-control'
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder='Your email'
        autoFocus
      />
      {/* <button type='submit' className=' btn btn-outline-primary'>
        Sign up
      </button> */}
      <Button type='submit' block shape='round' size='large'>
        Sign up
      </Button>
    </form>
  );

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Sign up</h4>

          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Signup;
