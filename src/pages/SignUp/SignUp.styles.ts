import { styled } from '@mui/system';
import { TextField, Button } from '@mui/material';

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
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
