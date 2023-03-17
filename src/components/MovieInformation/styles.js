import { Grid, Modal } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

export const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  margin: '30px 0 10px 0 !important',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
}));

export const StyledPosterImage = styled('img')(({ theme }) => ({
  borderRadius: '20px',
  boxShadow: '0.5em 1em 1em rgb(64,64,70)',
  height: 'auto',
  width: '100%',
  justifyContent: 'space-evenly',
  margin: '30px auto',
  [theme.breakpoints.down('md')]: {
    margin: '0 auto',
    width: 'auto',
    height: '350px',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    width: '33%',
    margin: '0px auto',
  },
}));

export const StyledGenreImage = styled('img')(({ theme }) => ({
  filter: theme.palette.mode === 'dark' && 'invert(1)',
  marginRight: '10px',
  width: '20%',
}));

export const posterContainer = {
  display: 'flex',
  marginBottom: '30px',
};
export const genresContainer = {
  margin: '10px 0',
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
};

export const StyledLinks = styled(Link)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: '0.5rem 1rem',
  },
}));

export const StyledCastImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxWwidth: '7em',
  height: '8em',
  objectFit: 'cover',
  borderRadius: '10px',
}));

export const StyledButtonsContainer = styled(
  Grid,
  'div'
)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  [theme.breakpoints.down('xl')]: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
}));

export const StyledModal = styled(Modal)({
  margin: '10px 0',
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
});

export const StyledIframe = styled('iframe')(({ theme }) => ({
  width: '50%',
  height: '50vh',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: '40vh',
  },
}));

export const StyledCloseModalIcon = styled(CloseIcon)(({ theme }) => ({
  cursor: 'pointer',
  position: 'absolute',
  top: '-1650%',
  right: '0',
  left: '75%',
  bottom: '0',
  [theme.breakpoints.down('md')]: {
    top: '-1415%',
    left: '-30%',
  },
}));

export const modalDialogContent = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  height: '100vh',
};
