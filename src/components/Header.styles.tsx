import { styled } from '@mui/system';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

export const StyledAppBar = styled(AppBar)`
  background-color: ${props => props.theme.palette.primary.main};
  box-shadow: none; /* Remove box shadow */
`;

export const StyledToolbar = styled(Toolbar)`
  padding: ${props => props.theme.spacing(1, 0)}; /* Add padding to the toolbar */
`;

export const StyledTypography = styled(Typography)`
  font-weight: bold;
  color: ${props => props.theme.palette.common.white};
  text-decoration: none;
`;

export const StyledSignUpButton = styled(Button)`
  margin-left: ${props => props.theme.spacing(2)}; /* Add left margin to the sign-up button */
`;
