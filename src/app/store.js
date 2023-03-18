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
import { peopleSlice } from '../features/peopleSlice';

const store = configureStore({
  reducer: {
    browse: browseSlice.reducer,
    cast: movieCastSlice.reducer,
    favorites: movieFavoriteSlice.reducer,
    genres: movieGenreSlice.reducer,
    movie: movieSlice.reducer,
    optionPreferences: optionPreferencesSlice.reducer,
    people: peopleSlice.reducer,
    popular: moviePopularSlice.reducer,
    recommendations: movieRecommendationSlice.reducer,
    tvshow: tvShowSlice.reducer,
    tvshows: tvShowsSlice.reducer,
    user: authSlice.reducer,
    watchlist: movieWatchlistSlice.reducer,
  },
});

export default store;
