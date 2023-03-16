import { TextField } from '@mui/material';
import { styled } from '@mui/system';

export const SearchContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  color: theme.palette.mode === 'light' && 'black',

  filter: theme.palette.mode === 'light' && 'invert(1)',
  '& .MuiInputBase-input': {
    [theme.breakpoints.down('sm')]: {
      margin: '-10px 0 10px 0',
    },
  },
}));
