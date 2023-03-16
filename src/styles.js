import { Box } from '@mui/material';
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

export const LoaderContainer = styled(Box)({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  height: '100vh',
  width: '80vw',
});
