import { styled } from '@mui/system';
import { Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  height: '70px',
  display: 'flex',
  justifyContent: 'space-between',
  marginLeft: '240px',
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
    flexWrap: 'wrap',
  },
}));

const MenuButton = styled(Button)(({ theme }) => ({
  marginRight: 2,
  outline: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const StyledNav = styled('nav')(({ theme }) => ({
  display: 'block',
  backgroundColor: 'red',
  [theme.breakpoints.up('sm')]: {
    width: '240px',
    flexShrink: 0,
  },
}));

export const MobileDrawer = {
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: 240,
  },
};

export const DesktopDrawer = {
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: 240,
  },
};

export const LinkButton = {
  '&:hover': {
    color: 'white',
    textDecoration: 'none',
  },
};

export const navMenuItemsContainer = {
  display: 'flex',
  gap: '2rem',
  justifyContent: 'center',
  alignItems: 'center',
};

const StyledNavMenuLink = styled(Link)({
  color: '#d7d3d3',
  '&:hover': {
    color: 'white',
    transform: 'scale(1.03)',
  },
});

export const activeMedia = {
  color: 'white',
  fontWeight: '600',
};

export { MenuButton, StyledToolbar, StyledNav, StyledNavMenuLink };
