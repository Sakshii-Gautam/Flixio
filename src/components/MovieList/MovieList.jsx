import { Grid } from '@mui/material';
import React from 'react';
import { Movie } from '../../components';
import { movieContainer } from './styles';

const MovieList = ({ movies, numberOfMovies, excludeFirst }) => {
  const startFrom = excludeFirst ? 1 : 0;
  return (
    <>
      <Grid container sx={movieContainer}>
        {movies?.results?.slice(startFrom, numberOfMovies).map((movie, i) => (
          <Movie key={movie.id} movie={movie} i={i} />
        ))}
      </Grid>
    </>
  );
};

export default MovieList;
