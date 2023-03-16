import {
  AppBar,
  Avatar,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  Box,
} from '@mui/material';
import {
  AccountCircle,
  Brightness4,
  Brightness7,
  Menu,
} from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import {
  MenuButton,
  StyledNav,
  StyledToolbar,
  MobileDrawer,
  DesktopDrawer,
  LinkButton,
} from './styles';
import { Link } from 'react-router-dom';
import { Sidebar, Search } from '../../components';
import { fetchToken } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../services';
import { ColorModeContext } from '../../utils/ToggleColorMode';
import { toggleMedia } from '../../features/optionPreferencesSlice';

const NavBar = () => {
  const colorMode = useContext(ColorModeContext);

  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width:600px)');
  const isSmallestDevice = useMediaQuery('(max-width:370px)');
  const { user, isAuthenticated, sessionId } = useSelector(
    (state) => state.user
  );
  const { media } = useSelector((state) => state.optionPreferences);
  const [mobileOpen, setMobileOpen] = useState(false);

  const token = localStorage.getItem('request_token');
  const sessionIdLocalStorage = localStorage.getItem('session_id');

  useEffect(() => {
    if (token) {
      dispatch(loginUser({ token, sessionIdLocalStorage }));
    }
  }, [dispatch]);

  return (
    <>
      {/* Header */}
      <AppBar position='fixed'>
        <StyledToolbar
          sx={{ pl: { xs: '0', sm: '2rem' }, pr: { xs: '0', sm: '2rem' } }}
        >
          {isMobile && (
            <MenuButton
              color='inherit'
              edge='start'
              onClick={() => {
                setMobileOpen((prevMobileOpen) => !prevMobileOpen);
              }}
            >
              <Menu />
            </MenuButton>
          )}

          {/* Search Icon  */}
          <IconButton
            color='inherit'
            sx={{ ml: { xs: '0', sm: '1' } }}
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          <Box
            sx={{
              display: 'flex',
              gap: { xs: '0', sm: '2rem' },
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Link component='Button' to={`/`}>
              <Button
                variant='secondary'
                sx={{ color: '#fff' }}
                onClick={() => dispatch(toggleMedia('movie'))}
              >
                Movies
              </Button>
            </Link>

            <Link component='Button' to={`/tv`}>
              <Button
                variant='secondary'
                sx={{ color: '#fff' }}
                onClick={() => dispatch(toggleMedia('tvshows'))}
              >
                {isSmallestDevice ? 'TV' : 'TV Shows'}
              </Button>
            </Link>
          </Box>

          {/* {!isMobile && <Search />} */}

          {/* Login | Logout */}
          <div>
            {!isAuthenticated ? (
              <Button color='inherit' onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color='inherit'
                component={Link}
                to={`/profile/${user?.id}`}
                onClick={() => {}}
                sx={LinkButton}
              >
                <Avatar
                  sx={{ w: '30px', h: '30px', backgroundColor: 'secondary' }}
                  // src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`}
                  alt='profile'
                >
                  S
                </Avatar>
              </Button>
            )}
          </div>

          {/* {isMobile && <Search />} */}
        </StyledToolbar>
      </AppBar>

      {/* SideBar */}
      <div>
        <StyledNav>
          {isMobile ? (
            <Drawer
              anchor='right'
              variant='temporary'
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              ModalProps={{
                keepMounted: true,
              }}
              sx={MobileDrawer}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer variant='permanent' sx={DesktopDrawer} open>
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </StyledNav>
      </div>
    </>
  );
};

export default NavBar;
