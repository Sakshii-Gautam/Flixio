import React, { useEffect, useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { SearchContainer, StyledTextField } from './styles';
import { searchMovie } from '../../features/optionPreferencesSlice';

const Search = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const searchingMovie = setTimeout(() => {
      dispatch(searchMovie(query));
    }, 1000);

    return () => {
      clearTimeout(searchingMovie);
    };
  }, [query]);

  return (
    <SearchContainer>
      <StyledTextField
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        value={query}
        variant='standard'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                  },
                }}
              />
            </InputAdornment>
          ),
        }}
      />
    </SearchContainer>
  );
};

export default Search;
