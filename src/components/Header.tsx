import React from 'react';
import { Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { StyledAppBar, StyledToolbar, StyledTypography, StyledSignUpButton } from './Header.styles'; // Import the useStyles function
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Define your theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff', // Set your primary color here
    },
    common: {
      white: '#fff', // Set your white color here
    },
    // Add more palette options as needed
  },
  spacing: (factor: number) => `${0.25 * factor}rem`, // Define your spacing function here
});

const Header: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledAppBar position='static'>
        <StyledToolbar>
          <Container maxWidth='lg'>
            <Grid container alignItems='center' justifyContent='space-between'>
              <Grid item>
                <StyledTypography variant='h6' color='inherit'>
                  NUS-CLASS-CONNECT
                </StyledTypography>
              </Grid>
              <Grid item>
                {/* Wrap the button inside Link component */}
                <Link to='/signup' style={{ textDecoration: 'none' }}>
                  <StyledSignUpButton color='inherit' variant='outlined'>
                    Sign Up
                  </StyledSignUpButton>
                </Link>
              </Grid>
            </Grid>
          </Container>
        </StyledToolbar>
      </StyledAppBar>
    </ThemeProvider>
  );
};

export default Header;
