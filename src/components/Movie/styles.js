import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  textOverflow: 'ellipsis',
  width: '200px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  marginTop: '10px',
  marginBottom: 0,
  textAlign: 'center',
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  alignItems: 'center',
  fontWeight: 'bold',
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    flexDirection: 'column',
  },

  '&:hover': {
    cursor: 'pointer',
  },
}));

export const image = {
  borderRadius: '20px',
  height: '220px',
  marginBottom: '10px',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.10)',
  },
};
