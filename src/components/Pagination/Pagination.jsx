import { Typography, Box, Button, IconButton } from '@mui/material';
import React from 'react';
import { paginationContainer } from './styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

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
      <IconButton
        onClick={handlePrev}
        sx={{ m: '30px 2px' }}
        variant='contained'
        type='button'
      >
        <NavigateBeforeIcon fontSize='large' />
      </IconButton>

      <Typography variant='h4' sx={{ m: '0 20px', color: 'text.primary' }}>
        {currentPage}
      </Typography>

      <IconButton
        onClick={handleNext}
        sx={{ m: '30px 2px' }}
        variant='contained'
        type='button'
      >
        <NavigateNextIcon fontSize='large' />
      </IconButton>
    </Box>
  );
};

export default Pagination;
