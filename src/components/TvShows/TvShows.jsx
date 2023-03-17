import { CircularProgress, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FeaturedMovie, MovieList, Pagination } from '../../components';
import { LoaderContainer } from '../../styles';
import { getTvShows } from '../../services/tv';

const TvShows = () => {
  const [page, setPage] = useState(1);
  const { tvshows, isLoading } = useSelector((state) => state.tvshows.tvshows);

  const { genreIdOrCategoryName } = useSelector(
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
    };
    dispatch(getTvShows(data));
  }, [genreIdOrCategoryName, page, dispatch]);

  return (
    <>
      {isLoading ? (
        <LoaderContainer>
          <CircularProgress size='4rem' />
        </LoaderContainer>
      ) : (
        <>
          {tvshows?.results && <FeaturedMovie movie={tvshows?.results?.[0]} />}
          <MovieList
            movies={tvshows}
            numberOfMovies={numberOfMovies}
            excludeFirst
          />
          {tvshows?.results && (
            <Pagination
              currentPage={page}
              setPage={setPage}
              totalPages={tvshows?.total_pages}
            />
          )}
        </>
      )}
    </>
  );
};

export default TvShows;
