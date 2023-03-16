import { createSlice } from '@reduxjs/toolkit';
import {
  getCastDetails,
  getFavoritesList,
  getMovieByCastId,
  getMovieById,
  getMoviesGenres,
  getPopularMovies,
  getRecommendations,
  getWatchlist,
} from '../services/tmdb';

const moviePopularSlice = createSlice({
  name: 'popular',
  initialState: { popular: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPopularMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPopularMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.popular = action.payload;
      })
      .addCase(getPopularMovies.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getMovieByCastId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMovieByCastId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.popular = action.payload;
      })
      .addCase(getMovieByCastId.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

const movieGenreSlice = createSlice({
  name: 'genres',
  initialState: { genres: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMoviesGenres.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMoviesGenres.fulfilled, (state, action) => {
        state.isLoading = false;
        state.genres = action.payload;
      })
      .addCase(getMoviesGenres.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

const movieSlice = createSlice({
  name: 'movie',
  initialState: { movie: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovieById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMovieById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movie = action.payload;
      })
      .addCase(getMovieById.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

const movieRecommendationSlice = createSlice({
  name: 'recommendations',
  initialState: { recommendations: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecommendations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecommendations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recommendations = action.payload;
      })
      .addCase(getRecommendations.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

const movieCastSlice = createSlice({
  name: 'movieCast',
  initialState: { cast: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCastDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCastDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cast = action.payload;
      })
      .addCase(getCastDetails.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

const movieFavoriteSlice = createSlice({
  name: 'favorites',
  initialState: { favorites: [], isSuccess: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFavoritesList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFavoritesList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.favorites = action.payload;
      })
      .addCase(getFavoritesList.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

const movieWatchlistSlice = createSlice({
  name: 'watchlist',
  initialState: { watchlist: [], isSuccess: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWatchlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWatchlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.watchlist = action.payload;
      })
      .addCase(getWatchlist.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export {
  moviePopularSlice,
  movieGenreSlice,
  movieSlice,
  movieRecommendationSlice,
  movieCastSlice,
  movieFavoriteSlice,
  movieWatchlistSlice,
};
