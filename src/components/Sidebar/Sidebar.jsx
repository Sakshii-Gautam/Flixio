import {
  Divider,
  List,
  ListItemText,
  ListItemIcon,
  Box,
  useTheme,
  ListItemButton,
  CircularProgress,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  GenreImages,
  image,
  imageLink,
  SidebarLoaderContainer,
  StyledLinks,
  StyledListSubheader,
} from './styles';
import { Link, useNavigate } from 'react-router-dom';
import { getMoviesGenres } from '../../services/tmdb';
import { useDispatch, useSelector } from 'react-redux';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/optionPreferencesSlice';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { getTvShowsGenres } from '../../services/tv';

const Sidebar = ({ setMobileOpen }) => {
  const { genres: tvGenres, isLoading: tvGenresLoading } = useSelector(
    (state) => state.tvshows.genres
  );
  const { genres, isLoading } = useSelector((state) => state.genres);
  const { media } = useSelector((state) => state.optionPreferences);
  const isMovies = media === 'movie';
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedGenreIndex, setSelectedGenreIndex] = useState(null);
  const [selectedCategoriesIndex, setSelectedCategoriesIndex] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const movieCategories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
  ];
  const tvShowsCategories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
  ];
  useEffect(() => {
    if (isMovies) {
      dispatch(getMoviesGenres());
    } else {
      dispatch(getTvShowsGenres());
    }
    setSelectedIndex(null);
    setSelectedGenreIndex(null);
    setSelectedCategoriesIndex(null);
    setMobileOpen(false);
  }, [media]);

  const theme = useTheme();
  return (
    <>
      {/* Logo */}
      <Link
        to={isMovies ? '/' : '/tv'}
        style={imageLink}
        onClick={() => {
          dispatch(selectGenreOrCategory('popular'));
          setSelectedCategoriesIndex(null);
          setSelectedIndex(null);
          setMobileOpen(false);
        }}
      >
        <Box
          component='img'
          sx={image}
          alt='logo'
          src={
            theme.palette.mode === 'light'
              ? genreIcons.flixioLogoBlue
              : genreIcons.flixioLogo
          }
        />
      </Link>

      <List>
        <ListItemButton
          onClick={() => {
            navigate('/browse');
            setSelectedIndex(0);
            setSelectedCategoriesIndex(null);
            setSelectedGenreIndex(null);
            setMobileOpen(false);
          }}
          selected={selectedIndex === 0}
        >
          <ListItemIcon>
            <SearchSharpIcon fontSize='large' />
          </ListItemIcon>
          <ListItemText primary={`Browse`} />
        </ListItemButton>
      </List>

      <Divider />

      {/* Movies/TV Shows Categories */}

      {isMovies ? (
        <List>
          <StyledListSubheader>Categories</StyledListSubheader>
          {movieCategories.map(({ label, value }, i) => (
            <StyledLinks to={`/`} key={value}>
              <ListItemButton
                selected={selectedCategoriesIndex === i}
                onClick={() => {
                  dispatch(selectGenreOrCategory(value));
                  setSelectedCategoriesIndex(i);
                  setSelectedGenreIndex(null);
                  setSelectedIndex(null);
                  setMobileOpen(false);
                }}
              >
                <ListItemIcon>
                  <GenreImages
                    component='img'
                    src={genreIcons[label.toLowerCase()]}
                  />
                </ListItemIcon>

                <ListItemText primary={label} />
              </ListItemButton>
            </StyledLinks>
          ))}
        </List>
      ) : (
        <List>
          <StyledListSubheader>Categories</StyledListSubheader>
          {tvShowsCategories.map(({ label, value }, i) => (
            <StyledLinks to={'/tv'} key={value}>
              <ListItemButton
                selected={selectedCategoriesIndex === i}
                onClick={() => {
                  dispatch(selectGenreOrCategory(value));
                  setSelectedCategoriesIndex(i);
                  setSelectedGenreIndex(null);
                  setSelectedIndex(null);
                  setMobileOpen(false);
                }}
              >
                <ListItemIcon>
                  <GenreImages
                    component='img'
                    src={genreIcons[label.toLowerCase()]}
                  />
                </ListItemIcon>

                <ListItemText primary={label} />
              </ListItemButton>
            </StyledLinks>
          ))}
        </List>
      )}

      <Divider />

      {/* Movies/TV shows Genres */}
      {isMovies ? (
        <List>
          <StyledListSubheader>Genres</StyledListSubheader>
          {isLoading ? (
            <SidebarLoaderContainer>
              <CircularProgress size='2rem' />
            </SidebarLoaderContainer>
          ) : (
            genres.map(({ id, name }, i) => (
              <StyledLinks to='/' key={id}>
                <ListItemButton
                  selected={selectedGenreIndex === i}
                  onClick={() => {
                    dispatch(selectGenreOrCategory(id));
                    setSelectedGenreIndex(i);
                    setSelectedCategoriesIndex(null);
                    setSelectedIndex(null);
                    setMobileOpen(false);
                  }}
                >
                  <ListItemIcon>
                    <GenreImages
                      component='img'
                      src={genreIcons[name.toLowerCase()]}
                    />
                  </ListItemIcon>

                  <ListItemText primary={name} />
                </ListItemButton>
              </StyledLinks>
            ))
          )}
        </List>
      ) : (
        <List>
          <StyledListSubheader>Genres</StyledListSubheader>
          {tvGenresLoading ? (
            <SidebarLoaderContainer>
              <CircularProgress size='2rem' />
            </SidebarLoaderContainer>
          ) : (
            tvGenres.map(({ id, name }, i) => (
              <StyledLinks to='/tv' key={id}>
                <ListItemButton
                  selected={selectedGenreIndex === i}
                  onClick={() => {
                    dispatch(selectGenreOrCategory(id));
                    setSelectedGenreIndex(i);
                    setSelectedCategoriesIndex(null);
                    setSelectedIndex(null);
                    setMobileOpen(false);
                  }}
                >
                  <ListItemIcon>
                    <GenreImages
                      component='img'
                      src={genreIcons[name.toLowerCase()]}
                    />
                  </ListItemIcon>

                  <ListItemText primary={name} />
                </ListItemButton>
              </StyledLinks>
            ))
          )}
        </List>
      )}
    </>
  );
};

export default Sidebar;
