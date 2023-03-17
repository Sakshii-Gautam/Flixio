import { Grid } from '@mui/material';
import React from 'react';
import { BrowseResult } from '..';
import { contentContainer } from './styles';

const BrowseResults = ({ movies, numberOfMovies }) => {
  const contentFilterByImages = movies?.results?.filter(
    (movie) => movie?.poster_path || movie?.profile_path
  );
  return (
    <Grid container sx={contentContainer}>
      {contentFilterByImages?.slice(0, numberOfMovies).map((movie, i) => (
        <BrowseResult key={movie.id} movie={movie} i={i} />
      ))}
    </Grid>
  );
};

export default BrowseResults;
