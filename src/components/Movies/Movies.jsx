import { Box, CircularProgress, Stack, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularMovies } from '../../services/tmdb';
import { FeaturedMovie, MovieList, Pagination } from '../../components';
import { LoaderContainer } from '../../styles';

const Movies = () => {
  const [page, setPage] = useState(1);
  const { popular, isLoading } = useSelector((state) => state.popular);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.optionPreferences
  );
  const dispatch = useDispatch();

  const largeDevice = useMediaQuery((theme) =>
    theme.breakpoints.between('md', 'lg')
  );
  const numberOfMovies = largeDevice ? 17 : 19;

  useEffect(() => {
    const data = {
      genreIdOrCategoryName,
      page,
      searchQuery,
    };
    dispatch(getPopularMovies(data));
  }, [genreIdOrCategoryName, page, searchQuery, dispatch]);

  return (
    <>
      {isLoading ? (
        <LoaderContainer>
          <CircularProgress size='4rem' />
        </LoaderContainer>
      ) : (
        <>
          {popular?.results && <FeaturedMovie movie={popular?.results?.[0]} />}
          <MovieList
            movies={popular}
            numberOfMovies={numberOfMovies}
            excludeFirst
          />
          {popular?.results && (
            <Pagination
              currentPage={page}
              setPage={setPage}
              totalPages={popular?.total_pages}
            />
          )}
        </>
      )}
    </>
  );
};

export default Movies;
