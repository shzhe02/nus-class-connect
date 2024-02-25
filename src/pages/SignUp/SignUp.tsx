import React, { useState, FormEvent } from 'react';
import './SignUp.css'; // Import CSS file for styling

function SignUp() {
  // State to track form inputs
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isSignUp, setIsSignUp] = useState<boolean>(true); // State to track the current mode (sign up or login)

  // Function to handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement sign-up or login logic here based on the current mode
    if (isSignUp) {
      console.log('Sign Up');
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Confirm Password:', confirmPassword);
    } else {
      console.log('Login');
      console.log('Email:', email);
      console.log('Password:', password);
    }
    // Reset form fields after submission
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  // Function to handle switching between sign up and login modes
  const handleModeSwitch = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className='SignUp-container'>
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {isSignUp && (
          <div className='form-group'>
            <label htmlFor='confirmPassword'>Confirm Password:</label>
            <input
              type='password'
              id='confirmPassword'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
        <button type='submit'>{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>
      <button onClick={handleModeSwitch}>{isSignUp ? 'Switch to Login' : 'Switch to Sign Up'}</button>
    </div>
  );
}

export default SignUp;
