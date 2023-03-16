import { Typography, Box } from '@mui/material';
import React from 'react';
import { Movie } from '..';

const RatedCards = ({ title, data }) => {
  return (
    <Box>
      <Typography
        variant='h5'
        gutterBottom
        sx={{ mt: '2rem', textAlign: 'center' }}
      >
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {data?.map((movie, i) => (
          <Movie key={movie.id} movie={movie} i={i} />
        ))}
      </Box>
    </Box>
  );
};

export default RatedCards;
