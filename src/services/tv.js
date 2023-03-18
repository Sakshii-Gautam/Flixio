import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;

const baseUrl = 'https://api.themoviedb.org/3';

export const getTvShows = createAsyncThunk(
  'tv/getTvShows',
  async ({ genreIdOrCategoryName, page, searchQuery }) => {
    try {
      if (searchQuery) {
        const response =
          await axios.get(`${baseUrl}/search/multi?api_key=${tmdbApiKey}&query=${searchQuery}&page=${page}
        `);
        return response.data;
      }

      //GET Movies By Category Name
      if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
        const response =
          await axios.get(`${baseUrl}/tv/${genreIdOrCategoryName}?api_key=${tmdbApiKey}&page=${page}
        `);
        return response.data;
      }

      //GET Movies By Genre Id
      if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
        const response =
          await axios.get(`${baseUrl}/discover/tv?with_genres=${genreIdOrCategoryName}&api_key=${tmdbApiKey}&page=${page}
        `);
        return response.data;
      }
    } catch (error) {
      console.error(error.message);
    }
  }
);

export const getTvShowsGenres = createAsyncThunk(
  'tv/getTvShowsGenres',
  async () => {
    try {
      const response =
        await axios.get(`${baseUrl}/genre/tv/list?api_key=${tmdbApiKey}
        `);
      return response.data.genres;
    } catch (error) {
      console.error(error.message);
    }
  }
);

export const getTvShowById = createAsyncThunk(
  'tv/getTvShowById',
  async ({ tv_id }) => {
    try {
      const response =
        await axios.get(`${baseUrl}/tv/${tv_id}?api_key=${tmdbApiKey}&append_to_response=videos,credits
        `);
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }
);

export const getTvShowsRecommendations = createAsyncThunk(
  'tv/getTvShowsRecommendations',
  async ({ tv_id }) => {
    try {
      const response =
        await axios.get(`${baseUrl}/tv/${tv_id}/recommendations?api_key=${tmdbApiKey}
        `);
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }
);

//Get Users favorites
export const getTvShowFavoritesList = createAsyncThunk(
  'tv/getTvShowFavoritesList',
  async ({ accountId, sessionId, page }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/account/${accountId}/favorite/tv?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`
      );

      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }
);

//Get Users watchlist
export const getTvShowWatchlist = createAsyncThunk(
  'tv/getTvShowWatchlist',
  async ({ accountId, sessionId, page }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/account/${accountId}/watchlist/tv?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`
      );

      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }
);
