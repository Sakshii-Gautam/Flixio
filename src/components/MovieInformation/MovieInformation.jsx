import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  DialogContent,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
  Language,
  Movie as MovieIcon,
  PlusOne,
  Theaters,
} from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  getFavoritesList,
  getMovieById,
  getRecommendations,
  getWatchlist,
} from '../../services/tmdb';
import {
  genresContainer,
  StyledLinks,
  StyledGenreImage,
  StyledGrid,
  StyledPosterImage,
  StyledCastImage,
  StyledButtonsContainer,
  StyledModal,
  StyledIframe,
} from './styles';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/optionPreferencesSlice';
import { MovieList } from '..';
import { LoaderContainer } from '../../styles';

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
const sessionId = localStorage.getItem('session_id');

const MovieInformation = () => {
  const {
    movie,
    isLoading: isMovieLoading,
    isError: isMovieError,
  } = useSelector((state) => state.movie);
  const { user } = useSelector((state) => state.user);
  const { favorites } = useSelector((state) => state.favorites);
  const { watchlist } = useSelector((state) => state.watchlist);
  const { recommendations } = useSelector((state) => state.recommendations);

  const { id } = useParams();
  const dispatch = useDispatch();

  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  useEffect(() => {
    dispatch(getMovieById(id));
    dispatch(getRecommendations({ list: 'recommendations', movie_id: id }));
    const data = {
      accountId: user.id,
      sessionId: localStorage.getItem('session_id'),
      page: 1,
    };
    dispatch(getFavoritesList(data));
    dispatch(getWatchlist(data));
  }, [id]);

  useEffect(() => {
    //Check if the movie has been already favorited
    setIsMovieFavorited(
      !!favorites?.results?.find((fav) => fav.id === movie.id) //!! for getting the boolean value
    );
  }, [favorites, movie]);

  useEffect(() => {
    //Check if the movie has been already watchlisted
    setIsMovieWatchlisted(
      !!watchlist?.results?.find((watch) => watch.id === movie.id) //!! for getting the boolean value
    );
  }, [watchlist, movie]);

  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${tmdbApiKey}&session_id=${sessionId}`,
      {
        media_type: 'movie',
        media_id: id,
        favorite: !isMovieFavorited,
      }
    );
    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${tmdbApiKey}&session_id=${sessionId}`,
      {
        media_type: 'movie',
        media_id: id,
        watchlist: !isMovieWatchlisted,
      }
    );
    setIsMovieWatchlisted((prev) => !prev);
  };

  if (isMovieLoading) {
    return (
      <LoaderContainer>
        <CircularProgress size='4rem' />
      </LoaderContainer>
    );
  }

  if (isMovieError) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Link to='/'>Something has gone wrong - Go Back</Link>
      </Box>
    );
  }

  return (
    <StyledGrid container>
      {/* Movie Poster */}
      <Grid
        item
        sm={12}
        lg={4}
        sx={{ textAlign: { xs: 'center', md: 'center', lg: 'none' } }}
      >
        <StyledPosterImage
          src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
          alt={movie?.title}
        />
      </Grid>

      {/* Movie Title And ReleaseDate */}
      <Grid
        item
        container
        direction='column'
        lg={7}
        sx={{ width: '90%', mt: '30px' }}
      >
        <Typography
          variant='h3'
          gutterBottom
          sx={{ fontWeight: '500', textAlign: 'center' }}
        >
          {movie?.title}({movie?.release_date?.split('-')[0]})
        </Typography>

        {/* Movie Tagline */}
        <Typography variant='h5' align='center' gutterBottom>
          {movie?.tagline}
        </Typography>

        {/* Movie Rating And Languages */}
        <StyledGrid item>
          <Box display='flex' align='center'>
            <Rating readOnly value={movie?.vote_average / 2} />

            <Typography variant='subtitle1' gutterBottom sx={{ ml: '10px' }}>
              {movie?.vote_average} /10
            </Typography>
          </Box>

          <Typography variant='h6' align='center' gutterBottom>
            {movie?.runtime} min | Language:
            {movie?.spoken_languages?.[0].name}
          </Typography>
        </StyledGrid>

        {/* Movie Genre */}
        <Grid item sx={genresContainer}>
          {movie?.genres?.map((genre) => (
            <StyledLinks
              sx={{ textDecoration: 'none' }}
              to='/'
              key={genre.id}
              onClick={() => {
                dispatch(selectGenreOrCategory(genre.id));
              }}
            >
              <StyledGenreImage src={genreIcons[genre?.name.toLowerCase()]} />

              <Typography variant='subtitle1' color='textPrimary'>
                {genre?.name}
              </Typography>
            </StyledLinks>
          ))}
        </Grid>

        {/* Movie Overview */}
        <Typography variant='h5' gutterBottom sx={{ mt: '10px' }}>
          Overview
        </Typography>
        <Typography sx={{ mb: '2rem' }}>{movie?.overview}</Typography>

        {/* Movie Cast */}
        <Typography variant='h5' gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {movie &&
            movie.credits?.cast
              ?.map(
                (character, i) =>
                  character.profile_path && (
                    <Grid
                      key={i}
                      item
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/person/${character.id}`}
                      sx={{ textDecoration: 'none' }}
                    >
                      <StyledCastImage
                        src={`https://image.tmdb.org/t/p/w500${character?.profile_path}`}
                        alt={character.name}
                      />
                      <Typography color='textPrimary'>
                        {character.name}
                      </Typography>
                      <Typography color='textSecondary'>
                        {character.character.split('/')[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>

        {/* Movie Call to Action */}
        <Grid item container sx={{ mt: '2rem' }}>
          <StyledButtonsContainer>
            <StyledButtonsContainer item xs={12} sm={6}>
              <ButtonGroup
                size='medium'
                variant='outlined'
                sx={{
                  justifyContent: {
                    md: 'center',
                    lg: 'initial',
                  },
                }}
              >
                <Button
                  target='_blank'
                  rel='noopener noreferrer'
                  href={movie?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target='_blank'
                  rel='noopener noreferrer'
                  href={`https://www.imdb.com/title/${movie?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  href='#'
                  onClick={() => setShowTrailerModal(!showTrailerModal)}
                  endIcon={<Theaters />}
                >
                  Trailer
                </Button>
              </ButtonGroup>
            </StyledButtonsContainer>

            <StyledButtonsContainer item xs={12} sm={6}>
              <ButtonGroup size='medium' variant='outlined'>
                <Button
                  onClick={addToFavorites}
                  endIcon={
                    isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button
                  onClick={addToWatchlist}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  Watchlist
                </Button>
                <Button
                  sx={{ borderColor: 'primary.main' }}
                  onClick={() => {}}
                  endIcon={<ArrowBack />}
                >
                  <Typography
                    sx={{ textDecoration: 'none' }}
                    color='inherit'
                    component={Link}
                    to='/'
                    variant='subtitle2'
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </StyledButtonsContainer>
          </StyledButtonsContainer>
        </Grid>
      </Grid>

      {/* Movie Similar - You Might Also Like */}
      <Box sx={{ mt: '2rem', width: '100%' }}>
        <Typography
          variant='h4'
          gutterBottom
          sx={{ fontWeight: '500', textAlign: 'center' }}
        >
          You might also like
        </Typography>

        {recommendations ? (
          <MovieList
            className='movielist'
            movies={recommendations}
            numberOfMovies={12}
          />
        ) : (
          <Box>Sorry, No Similar Movies Found!</Box>
        )}
      </Box>

      {/* Movie Trailer */}
      <StyledModal
        closeAfterTransition
        open={showTrailerModal}
        onClose={() => setShowTrailerModal(!showTrailerModal)}
      >
        <DialogContent>
          {movie.videos?.results?.length > 0 && (
            <StyledIframe
              className='videos'
              autoPlay
              title='Trailer'
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
              allow='autoplay'
            />
          )}
        </DialogContent>
      </StyledModal>
    </StyledGrid>
  );
};

export default MovieInformation;
