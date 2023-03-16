import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;

const baseUrl = 'https://api.themoviedb.org/3';

export const getPopularMovies = createAsyncThunk(
  'movies/getPopular',
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
          await axios.get(`${baseUrl}/movie/${genreIdOrCategoryName}?api_key=${tmdbApiKey}&page=${page}
        `);
        return response.data;
      }

      //GET Movies By Genre Id
      if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
        const response =
          await axios.get(`${baseUrl}/discover/movie?with_genres=${genreIdOrCategoryName}&api_key=${tmdbApiKey}&page=${page}
        `);
        return response.data;
      }
    } catch (error) {
      console.error(error.message);
    }
  }
);

export const getMoviesGenres = createAsyncThunk(
  'movies/getMoviesGenre',
  async () => {
    try {
      const response =
        await axios.get(`${baseUrl}/genre/movie/list?api_key=${tmdbApiKey}
        `);
      return response.data.genres;
    } catch (error) {
      console.error(error.message);
    }
  }
);

export const getMovieById = createAsyncThunk(
  'movies/getMovieById',
  async (id) => {
    try {
      const response =
        await axios.get(`${baseUrl}/movie/${id}?api_key=${tmdbApiKey}&append_to_response=videos,credits
        `);
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }
);

export const getRecommendations = createAsyncThunk(
  'movies/getRecommendations',
  async ({ list, movie_id }) => {
    try {
      const response =
        await axios.get(`${baseUrl}/movie/${movie_id}/${list}?api_key=${tmdbApiKey}
        `);
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }
);

export const getCastDetails = createAsyncThunk(
  'movies/getCastDetails',
  async ({ cast_id }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/person/${cast_id}?api_key=${tmdbApiKey}`
      );
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }
);

export const getMovieByCastId = createAsyncThunk(
  'movies/getMovieByCastId',
  async ({ cast_id, page }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/discover/movie?api_key=${tmdbApiKey}&with_cast=${cast_id}&page=${page}`
      );

      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }
);

//Get Users favorites
export const getFavoritesList = createAsyncThunk(
  'movies/getFavoritesList',
  async ({ accountId, sessionId, page }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/account/${accountId}/favorite/movies?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`
      );

      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }
);

//Get Users watchlist
export const getWatchlist = createAsyncThunk(
  'movies/getWatchlist',
  async ({ accountId, sessionId, page }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/account/${accountId}/watchlist/movies?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`
      );

      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }
);
