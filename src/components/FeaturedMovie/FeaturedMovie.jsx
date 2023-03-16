import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  featuredCardContainer,
  cardMedia,
  card,
  cardContent,
  featuredCardText,
  featuredCardTitle,
} from './styles';

const FeaturedMovie = ({ movie }) => {
  const { media } = useSelector((state) => state.optionPreferences);
  const isMovies = media === 'movie';

  return (
    <Box
      component={Link}
      to={isMovies ? `/movie/${movie?.id}` : `/tv/${movie?.id}`}
      sx={featuredCardContainer}
    >
      <Card sx={card}>
        <CardMedia
          media='picture'
          alt={movie?.title || movie?.name}
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          title={movie?.title || movie?.name}
          sx={cardMedia}
        />

        <Box sx={{ p: '20px' }}>
          <CardContent sx={cardContent}>
            <Typography variant='h5' gutterBottom sx={featuredCardTitle}>
              {movie?.title || movie?.name}
            </Typography>
            <Typography variant='body2' sx={featuredCardText}>
              {movie?.overview}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
