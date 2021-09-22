import React, { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState();

  const handleSubmit = () => {};

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        className='mb-2 form-control'
        value={email}
        onChange={e => setEmail(e.target.value)}
        autoFocus
      />
      <button type='submit' className=' btn btn-outline-primary'>
        Sign up
      </button>
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
