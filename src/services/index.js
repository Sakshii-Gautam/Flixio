import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createSessionId } from '../utils';

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
const baseUrl = 'https://api.themoviedb.org/3';

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ token, sessionIdLocalStorage }) => {
    try {
      if (token) {
        if (sessionIdLocalStorage) {
          //If sessionId from localstorage already exists
          const response = await axios.get(
            `${baseUrl}/account?api_key=${tmdbApiKey}&session_id=${sessionIdLocalStorage}`
          );
          return response.data;
        } else {
          // If sessionId from localstorage does not exists, Creating a new sessionId
          const sessionId = await createSessionId();
          const response = await axios.get(
            `${baseUrl}/account?api_key=${tmdbApiKey}&session_id=${sessionId}`
          );
          return response.data;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
);

//Get Trending List For Movies and TV Shows
export const getAllTrending = createAsyncThunk(
  'browse/getAllTrending',
  async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/trending/all/day?api_key=${tmdbApiKey}`
      );
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }
);

//Get Movies, TV shows and People by Search
export const getSearchList = createAsyncThunk(
  'browse/getSearchList',
  async ({ page = 1, searchQuery = '', browseMedia = '', language = '' }) => {
    try {
      if (browseMedia && language) {
        const response =
          await axios.get(`${baseUrl}/discover/${browseMedia}?api_key=${tmdbApiKey}&with_original_language=${language}&page=${page}
        `);
        return response.data;
      }

      if (searchQuery.length > 0) {
        if (browseMedia) {
          const response =
            await axios.get(`${baseUrl}/search/${browseMedia}?api_key=${tmdbApiKey}&query=${searchQuery}&page=${page}
        `);
          return response.data;
        }
        const response =
          await axios.get(`${baseUrl}/search/multi?api_key=${tmdbApiKey}&query=${searchQuery}&page=${page}
        `);
        return response.data;
      }

      if (searchQuery.length === 0 && browseMedia) {
        const response =
          await axios.get(`${baseUrl}/trending/${browseMedia}/day?api_key=${tmdbApiKey}
      `);
        return response.data;
      }
    } catch (error) {
      console.error(error.message);
    }
  }
);

//Get Movies, TV shows and People by Filter: Language
export const getFilteredMovies = createAsyncThunk(
  'browse/getFilteredMovies',
  async ({ page = 1, language = 'en' }) => {
    try {
      const response = await axios.get(`
        https://api.themoviedb.org/3/discover/movie?api_key=67fc22560a15806ec749877be92b14f7&with_original_language=${language}&page=${page}
        `);
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }
);

export const getCombinedCreditsByCastId = createAsyncThunk(
  'cast/getCombinedCredits',
  async ({ cast_id, page }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/person/${cast_id}?api_key=${tmdbApiKey}&append_to_response=combined_credits`
      );
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }
);
