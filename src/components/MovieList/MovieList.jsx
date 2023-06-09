import { Grid } from '@mui/material';
import React from 'react';
import { Movie, Media } from '../../components';
import { movieContainer } from './styles';

const MovieList = ({
  movies,
  numberOfMovies,
  excludeFirst,
  castCredits,
  recommendations,
}) => {
  const startFrom = excludeFirst ? 1 : 0;
  const moviesFilterByImages = movies?.results?.filter(
    (movie) => movie?.poster_path || movie?.profile_path
  );
  return (
    <>
      <Grid container sx={movieContainer}>
        {moviesFilterByImages
          ?.slice(startFrom, numberOfMovies)
          .map((movie, i) => (
            <Movie key={movie.id} movie={movie} i={i} />
          ))}

        {castCredits?.slice(startFrom, numberOfMovies).map((movie, i) => (
          <Media key={movie.id} movie={movie} i={i} />
        ))}
        {recommendations?.results
          ?.slice(startFrom, numberOfMovies)
          .map((movie, i) => (
            <Media key={movie.id} movie={movie} i={i} />
          ))}
      </Grid>
    </>
  );
};

export default MovieList;
