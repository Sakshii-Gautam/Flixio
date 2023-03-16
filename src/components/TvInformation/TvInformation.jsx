import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  DialogContent,
  Grid,
  Modal,
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
} from '../MovieInformation/styles.js';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/optionPreferencesSlice';
import { MovieList } from '..';
import { LoaderContainer } from '../../styles';
import {
  getTvShowById,
  getTvShowFavoritesList,
  getTvShowsRecommendations,
  getTvShowWatchlist,
} from '../../services/tv';

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
const sessionId = localStorage.getItem('session_id');

const TvInformation = () => {
  const {
    tvshow,
    isLoading: isTvShowLoading,
    isError: isTvShowError,
  } = useSelector((state) => state.tvshow);
  const { user } = useSelector((state) => state.user);
  const { favorites } = useSelector((state) => state.favorites);
  const { watchlist } = useSelector((state) => state.watchlist);

  const {
    recommendations: { recommendations },
  } = useSelector((state) => state.tvshows);

  const { id } = useParams();
  const dispatch = useDispatch();

  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [isTvShowFavorited, setIsTvShowFavorited] = useState(false);
  const [isTvShowWatchlisted, setIsTvShowWatchlisted] = useState(false);

  useEffect(() => {
    dispatch(getTvShowById(id));
    dispatch(getTvShowsRecommendations({ tv_id: id }));
    const data = {
      accountId: user.id,
      sessionId: localStorage.getItem('session_id'),
      page: 1,
    };
    dispatch(getTvShowFavoritesList(data));
    dispatch(getTvShowWatchlist(data));
  }, [id]);

  useEffect(() => {
    //Check if the movie has been already favorited
    setIsTvShowFavorited(
      !!favorites?.results?.find((fav) => fav.id === tvshow.id) //!! for getting the boolean value
    );
  }, [favorites, tvshow]);

  useEffect(() => {
    //Check if the movie has been already watchlisted
    setIsTvShowWatchlisted(
      !!watchlist?.results?.find((watch) => watch.id === tvshow.id) //!! for getting the boolean value
    );
  }, [watchlist, tvshow]);

  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${tmdbApiKey}&session_id=${sessionId}`,
      {
        media_type: 'tv',
        media_id: id,
        favorite: !isTvShowFavorited,
      }
    );
    setIsTvShowFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${tmdbApiKey}&session_id=${sessionId}`,
      {
        media_type: 'tv',
        media_id: id,
        watchlist: !isTvShowWatchlisted,
      }
    );
    setIsTvShowWatchlisted((prev) => !prev);
  };

  if (isTvShowLoading) {
    return (
      <LoaderContainer>
        <CircularProgress size='4rem' />
      </LoaderContainer>
    );
  }

  if (isTvShowError) {
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
          src={`https://image.tmdb.org/t/p/w500${tvshow?.poster_path}`}
          alt={tvshow?.name}
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
          {tvshow?.name}
        </Typography>

        {/* Movie Tagline */}
        <Typography variant='h5' align='center' gutterBottom>
          {tvshow?.tagline}
        </Typography>

        {/* Movie Rating And Languages */}
        <StyledGrid item>
          <Box display='flex' align='center'>
            <Rating readOnly value={tvshow?.vote_average / 2} />

            <Typography variant='subtitle1' gutterBottom sx={{ ml: '10px' }}>
              {tvshow?.vote_average} /10
            </Typography>
          </Box>

          <Typography variant='h6' align='center' gutterBottom>
            {tvshow?.number_of_seasons > 1
              ? `${tvshow?.number_of_seasons} seasons`
              : `${tvshow?.number_of_episodes} episodes`}{' '}
            | Language:
            {tvshow?.spoken_languages?.[0].name}
          </Typography>
        </StyledGrid>

        {/* Movie Genre */}
        <Grid item sx={genresContainer}>
          {tvshow?.genres?.map((genre) => (
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
        <Typography sx={{ mb: '2rem' }}>{tvshow?.overview}</Typography>

        {/* Movie Cast */}
        <Typography variant='h5' gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {tvshow &&
            tvshow.credits?.cast
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
                  href={tvshow?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                {/* <Button
                  target='_blank'
                  rel='noopener noreferrer'
                  href={`https://www.imdb.com/title/${tvshow?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button> */}
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
                    isTvShowFavorited ? (
                      <FavoriteBorderOutlined />
                    ) : (
                      <Favorite />
                    )
                  }
                >
                  {isTvShowFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button
                  onClick={addToWatchlist}
                  endIcon={isTvShowWatchlisted ? <Remove /> : <PlusOne />}
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
          {tvshow.videos?.results?.length > 0 && (
            <StyledIframe
              className='videos'
              autoPlay
              title='Trailer'
              src={`https://www.youtube.com/embed/${tvshow.videos.results[0].key}`}
              allow='autoplay'
            />
          )}
        </DialogContent>
      </StyledModal>
    </StyledGrid>
  );
};

export default TvInformation;
