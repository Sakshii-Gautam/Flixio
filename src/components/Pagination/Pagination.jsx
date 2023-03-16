import { Typography, Box, Button } from '@mui/material';
import React from 'react';
import { paginationContainer } from './styles';

const Pagination = ({ currentPage, setPage, totalPages }) => {
  const handlePrev = () => {
    if (currentPage !== 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage !== totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (totalPages === 0) return null;

  return (
    <Box sx={paginationContainer}>
      <Button
        onClick={handlePrev}
        sx={{ m: '30px 2px' }}
        variant='contained'
        color='primary'
        type='button'
      >
        Prev
      </Button>

      <Typography variant='h4' sx={{ m: '0 20px', color: 'text.primary' }}>
        {currentPage}
      </Typography>

      <Button
        onClick={handleNext}
        sx={{ m: '30px 2px' }}
        variant='contained'
        color='primary'
        type='button'
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
