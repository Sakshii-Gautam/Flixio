import { createSlice } from '@reduxjs/toolkit';
import {
  getTvShows,
  getTvShowById,
  getTvShowsRecommendations,
  getTvShowFavoritesList,
  getTvShowWatchlist,
  getTvShowsGenres,
} from '../services/tv';

const initialState = {
  tvshows: {
    tvshows: [],
    isLoading: false,
    isError: false,
  },
  genres: {
    genres: [],
    isLoading: false,
    isError: false,
  },
  recommendations: {
    recommendations: [],
    isLoading: false,
    isError: false,
  },
  favorites: {
    favorites: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  watchlist: {
    watchlist: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
};

const tvShowsSlice = createSlice({
  name: 'tvShows',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getTvShows.pending, (state) => {
        state.tvshows.isLoading = true;
      })
      .addCase(getTvShows.fulfilled, (state, action) => {
        state.tvshows.isLoading = false;
        state.tvshows.tvshows = action.payload;
      })
      .addCase(getTvShows.rejected, (state) => {
        state.tvshows.isLoading = false;
        state.tvshows.isError = true;
      })

      .addCase(getTvShowsGenres.pending, (state) => {
        state.genres.isLoading = true;
      })
      .addCase(getTvShowsGenres.fulfilled, (state, action) => {
        state.genres.isLoading = false;
        state.genres.genres = action.payload;
      })
      .addCase(getTvShowsGenres.rejected, (state) => {
        state.genres.isLoading = false;
        state.genres.isError = true;
      })

      .addCase(getTvShowsRecommendations.pending, (state) => {
        state.recommendations.isLoading = true;
      })
      .addCase(getTvShowsRecommendations.fulfilled, (state, action) => {
        state.recommendations.isLoading = false;
        state.recommendations.recommendations = action.payload;
      })
      .addCase(getTvShowsRecommendations.rejected, (state) => {
        state.recommendations.isLoading = false;
        state.recommendations.isError = true;
      })

      .addCase(getTvShowFavoritesList.pending, (state) => {
        state.favorites.isLoading = true;
      })
      .addCase(getTvShowFavoritesList.fulfilled, (state, action) => {
        state.favorites.isLoading = false;
        state.favorites.isSuccess = true;
        state.favorites.favorites = action.payload;
      })
      .addCase(getTvShowFavoritesList.rejected, (state) => {
        state.favorites.isLoading = false;
        state.favorites.isError = true;
      })

      .addCase(getTvShowWatchlist.pending, (state) => {
        state.watchlist.isLoading = true;
      })
      .addCase(getTvShowWatchlist.fulfilled, (state, action) => {
        state.watchlist.isLoading = false;
        state.watchlist.isSuccess = true;
        state.watchlist.watchlist = action.payload;
      })
      .addCase(getTvShowWatchlist.rejected, (state) => {
        state.watchlist.isLoading = false;
        state.watchlist.isError = true;
      });
  },
});

const tvShowSlice = createSlice({
  name: 'tvshow',
  initialState: { tvshow: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTvShowById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTvShowById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tvshow = action.payload;
      })
      .addCase(getTvShowById.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export { tvShowSlice, tvShowsSlice };
