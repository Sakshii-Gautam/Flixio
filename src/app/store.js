import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/authSlice';
import optionPreferencesSlice from '../features/optionPreferencesSlice';
import {
  moviePopularSlice,
  movieGenreSlice,
  movieSlice,
  movieRecommendationSlice,
  movieCastSlice,
  movieFavoriteSlice,
  movieWatchlistSlice,
} from '../features/movieSlice';
import { browseSlice } from '../features/browseSlice';
import { tvShowSlice, tvShowsSlice } from '../features/tvSlice';

const store = configureStore({
  reducer: {
    browse: browseSlice.reducer,
    popular: moviePopularSlice.reducer,
    genres: movieGenreSlice.reducer,
    optionPreferences: optionPreferencesSlice.reducer,
    user: authSlice.reducer,
    movie: movieSlice.reducer,
    tvshow: tvShowSlice.reducer,
    recommendations: movieRecommendationSlice.reducer,
    tvshows: tvShowsSlice.reducer,
    cast: movieCastSlice.reducer,
    favorites: movieFavoriteSlice.reducer,
    watchlist: movieWatchlistSlice.reducer,
  },
});

export default store;
