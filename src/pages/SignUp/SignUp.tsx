import React, { useState, FormEvent } from 'react';
import { Typography } from '@mui/material';
import { Container, Form, FormField, StyledButton, BackButton, ContentWrapper } from './SignUp.styles'; // Import styled components
import { Link } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isSignUp, setIsSignUp] = useState<boolean>(true);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleModeSwitch = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <Container>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <BackButton color='inherit' variant='outlined'>
          Back to Homepage
        </BackButton>
      </Link>
      <ContentWrapper>
        {' '}
        {/* Wrapper div for content */}
        <Typography variant='h4'>{isSignUp ? 'Sign Up' : 'Login'}</Typography>
        <Form onSubmit={handleSubmit}>
          <FormField label='Email' variant='outlined' value={email} onChange={e => setEmail(e.target.value)} required />
          <FormField
            label='Password'
            type='password'
            variant='outlined'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {isSignUp && (
            <FormField
              label='Confirm Password'
              type='password'
              variant='outlined'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          )}
          <StyledButton variant='contained' type='submit'>
            {isSignUp ? 'Sign Up' : 'Login'}
          </StyledButton>
        </Form>
        <StyledButton onClick={handleModeSwitch}>{isSignUp ? 'Switch to Login' : 'Switch to Sign Up'}</StyledButton>
      </ContentWrapper>
    </Container>
  );
}

export default SignUp;
