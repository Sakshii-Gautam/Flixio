import { Grid } from '@mui/material';
import React from 'react';
import { BrowseResult } from '..';
import { movieContainer } from '../MovieList/styles';

const BrowseResults = ({ movies, numberOfMovies, excludeFirst }) => {
  return (
    <Grid container sx={movieContainer}>
      {movies?.results?.map((movie, i) => (
        <BrowseResult key={movie.id} movie={movie} i={i} />
      ))}
    </Grid>
  );
};

export default BrowseResults;
