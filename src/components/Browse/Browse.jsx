import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
  InputAdornment,
  CircularProgress,
  useMediaQuery,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { Search as SearchIcon } from '@mui/icons-material';
import {
  searchLanguage,
  searchMovie,
  setBrowseMedia,
} from '../../features/optionPreferencesSlice';
import { LoaderContainer } from '../../styles';
import { BrowseResults } from '..';
import { getSearchList, getAllTrending } from '../../services';
import { allLanguages, allMedia } from '../../constants';
import styles from './styles';

const Browse = () => {
  const { allContent, isLoading: isAllContentLoading } = useSelector(
    (state) => state.browse.allContent
  );
  const { searchQuery, language, browseMedia, media } = useSelector(
    (state) => state.optionPreferences
  );

  const dispatch = useDispatch();
  const [languageFilter, setLanguageFilter] = useState(language || '');
  const [query, setQuery] = useState(searchQuery || '');
  const [mediaFilter, setMediaFilter] = useState(browseMedia || '');
  const largeDevice = useMediaQuery((theme) => theme.breakpoints.only('lg'));
  const smallDevice = useMediaQuery((theme) => theme.breakpoints.down('sm_md'));
  const numberOfMovies = largeDevice ? 19 : 17;
  const isSearching = query.length > 0;

  useEffect(() => {
    if (!searchQuery && !browseMedia && !language) {
      dispatch(getAllTrending());
    }
  }, [searchQuery, browseMedia, language]);

  useEffect(() => {
    const searchingMovie = setTimeout(() => {
      if (isSearching) {
        setLanguageFilter('');
        dispatch(searchMovie(query));
      }
    }, 1000);
    return () => {
      clearTimeout(searchingMovie);
    };
  }, [query]);

  useEffect(() => {
    dispatch(searchLanguage(languageFilter));
  }, [languageFilter]);

  useEffect(() => {
    dispatch(setBrowseMedia(mediaFilter));
  }, [mediaFilter]);

  useEffect(() => {
    dispatch(getSearchList({ browseMedia, language, searchQuery }));
  }, [language, browseMedia, searchQuery]);

  return (
    <>
      <Box sx={styles.searchContainer}>
        {/* Search Field */}
        <TextField
          autoFocus
          variant='standard'
          placeholder={
            smallDevice
              ? `Search Titles..`
              : `Search Movie Titles, TV Shows, People...`
          }
          value={query}
          sx={{ width: { xs: '50%', sm: '60%' } }}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter') dispatch(searchMovie(query));
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon
                  onClick={() => dispatch(searchMovie(query))}
                  sx={styles.searchIcon}
                />
              </InputAdornment>
            ),
          }}
        />

        {/* Media Type Filter */}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: smallDevice ? '0.5rem' : '3rem',
            flexDirection: { xs: 'column', xs_sm: 'row' },
          }}
        >
          <FormControl sx={{ width: '200px' }} size='small'>
            <Select
              value={mediaFilter}
              onChange={(e) => {
                setMediaFilter(e.target.value);
              }}
              displayEmpty
              MenuProps={{ style: { maxHeight: 300 } }}
            >
              {allMedia.map(({ name, value }) => (
                <MenuItem key={name} value={value}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Language Preferences */}

          <FormControl sx={{ width: '180px' }} size='small'>
            <Select
              disabled={browseMedia === 'person'}
              value={languageFilter}
              onChange={(e) => {
                setQuery('');
                setLanguageFilter(e.target.value);
              }}
              displayEmpty
              MenuProps={{ style: { maxHeight: 300 } }}
            >
              {allLanguages.map(({ name, value }) => (
                <MenuItem key={name} value={value}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Search Results */}

        {isAllContentLoading ? (
          <LoaderContainer>
            <CircularProgress size='4rem' />
          </LoaderContainer>
        ) : (
          <>
            {isSearching && !allContent?.results ? (
              <>
                <LoaderContainer sx={{ height: '40vh' }}>
                  <CircularProgress size='4rem' />
                </LoaderContainer>
              </>
            ) : (
              <BrowseResults
                movies={allContent}
                numberOfMovies={numberOfMovies}
              />
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default Browse;
