import { ArrowBack } from '@mui/icons-material';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCastDetails, getMovieByCastId } from '../../services/tmdb';
import { MovieList, Pagination } from '..';
import { actorImage, actorDetailsContainer, buttonsContainer } from './styles';
import { LoaderContainer } from '../../styles';
import { StyledGrid, StyledPosterImage } from '../MovieInformation/styles';

const Actors = () => {
  const { cast, isLoading, isError } = useSelector((state) => state.cast);
  const { popular: castMovies } = useSelector((state) => state.popular);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getCastDetails({ cast_id: id }));
    dispatch(getMovieByCastId({ cast_id: id, page: page }));
  }, [dispatch, id, page]);

  if (isLoading) {
    return (
      <LoaderContainer>
        <CircularProgress size='4rem' />
      </LoaderContainer>
    );
  }

  if (isError) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          color='primary'
        >
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <>
      {/* Cast's Image */}
      <StyledGrid container>
        <Grid item sm={12} lg={4} align='center'>
          <StyledPosterImage
            src={
              cast?.profile_path
                ? `https://image.tmdb.org/t/p/w500${cast?.profile_path}`
                : 'https:/shrtco.de/YWpmUW'
            }
            alt={cast?.name}
          />
        </Grid>

        {/* Cast's Biography */}
        {/* <Grid item lg={7} xl={8} sx={actorDetailsContainer}> */}
        <Grid
          item
          container
          direction='column'
          lg={7}
          sx={{ width: '90%', mt: '30px' }}
        >
          <Typography variant='h3' gutterBottom sx={{ fontWeight: '500' }}>
            {cast?.name}
          </Typography>

          <Typography variant='h5' gutterBottom>
            Born: {new Date(cast?.birthday).toDateString()}
          </Typography>

          <Typography variant='body1' align='justify' paragraph>
            {cast?.biography || 'No Biography Yet...'}
          </Typography>

          <Box sx={buttonsContainer}>
            <Button
              variant='contained'
              color='primary'
              href={`https://www.imdb.com/name/${cast?.imdb_id}`}
            >
              IMDB
            </Button>

            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              color='primary'
            >
              Go Back
            </Button>
          </Box>
        </Grid>
      </StyledGrid>

      {/* Cast's Movies */}
      <Box margin='2rem 0'>
        <Typography
          variant='h4'
          gutterBottom
          sx={{ fontWeight: '500', textAlign: 'center' }}
        >
          Movies
        </Typography>

        {castMovies ? (
          <>
            <MovieList movies={castMovies} numberOfMovies={12} />
            <Pagination
              currentPage={page}
              setPage={setPage}
              totalPages={castMovies?.total_pages}
            />
          </>
        ) : (
          <Box>Sorry, {cast?.name} is not casted in other Movies yet...</Box>
        )}
      </Box>
    </>
  );
};

export default Actors;
