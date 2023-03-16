import { Box, Grid, Grow, Rating, Tooltip } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { image, StyledLink, StyledTypography } from './styles';

const Movie = ({ movie, i }) => {
  const { media } = useSelector((state) => state.optionPreferences);
  const isPeople = media === 'person';
  const infoLink =
    movie?.media_type === 'person'
      ? `/person/${movie.id}`
      : media === 'tv'
      ? `/tv/${movie.id}`
      : `/movie/${movie.id}`;
  const defaultImage = 'https:/shrtco.de/YWpmUW';

  const sourceImage = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
    : movie?.profile_path
    ? `https://image.tmdb.org/t/p/w500${movie?.profile_path}`
    : defaultImage;

  return (
    <Grid
      item
      xs={12}
      xs_sm={6}
      sm={6}
      md={3}
      lg={2}
      sx={{ p: '10px', pb: { md: '1.5rem' } }}
    >
      <Grow in key={i} timeout={(i + 1) * 100} appear>
        <StyledLink to={infoLink}>
          <Box component='img' sx={image} alt={movie.title} src={sourceImage} />
          <StyledTypography variant='h6'>
            {movie?.media_type === 'tv'
              ? movie?.name
              : movie.media_type === 'person'
              ? movie?.name
              : movie?.title || movie?.name}
          </StyledTypography>
          {!isPeople && (
            <Tooltip disableTouchListener title={`${movie.vote_average} /10`}>
              <div style={{ display: 'flex' }}>
                <Rating
                  readOnly
                  value={movie.vote_average / 2}
                  precision={0.1}
                />
              </div>
            </Tooltip>
          )}
        </StyledLink>
      </Grow>
    </Grid>
  );
};

export default Movie;
