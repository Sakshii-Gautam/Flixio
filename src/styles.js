import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';

export const root = {
  display: 'flex',
  height: '100%',
};

export const content = {
  height: '70px',
};

export const toolbar = {
  flexGrow: '1',
  padding: ' 2em',
};

export const LoaderContainer = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  height: '100vh',
  width: '80vw',
  [theme.breakpoints.down('sm')]: {
    width: '100vw',
  },
}));

export const GoBackButton = styled(Button)(({ theme }) => ({
  marginLeft: '15px',
  marginTop: '15px',
  color: theme.palette.primary,
}));
