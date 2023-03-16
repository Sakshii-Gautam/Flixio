import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

export const imageLink = {
  display: 'flex',
  justifyContent: 'center',
  padding: '10% 0',
};

export const image = {
  width: '70%',
};

export const GenreImages = styled(Box)(({ theme }) => ({
  height: '30px',
  filter: theme.palette.mode === 'dark' && 'invert(1)',
}));

export const StyledLinks = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
}));

export const SidebarLoaderContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50vh',
});
