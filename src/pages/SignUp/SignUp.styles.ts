import { styled } from '@mui/system';
import { TextField, Button } from '@mui/material';

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '80vh',
});

export const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '300px',
});

export const FormField = styled(TextField)({
  margin: '10px',
  width: '100%',
});

export const StyledButton = styled(Button)({
  margin: '10px',
  width: '100%',
});

// Define the BackButton styled component
export const BackButton = styled(Button)({
  margin: '10px',
  width: '100%',
  backgroundColor: '#2196f3', // Example background color
  color: 'white',
  '&:hover': {
    backgroundColor: '#0d47a1', // Example hover background color
  },
});

export const ContentWrapper = styled('div')({
  borderRadius: '10px',
  border: '2px solid #ccc', // Add border
  padding: '20px',
  boxSizing: 'border-box', // Include padding and border in the width calculation
  marginTop: '20px', // Add margin-top for distance from other components
  marginBottom: '20px', // Add margin-bottom for distance from other components
  display: 'flex', // Enable flexbox layout
  flexDirection: 'column', // Stack child elements vertically
  alignItems: 'center', // Center child elements horizontally
  justifyContent: 'center', // Center child elements vertically
});
