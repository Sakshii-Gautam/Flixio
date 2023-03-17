import { createSlice } from '@reduxjs/toolkit';

const media = sessionStorage.getItem('mediaTypePreference');

const optionPreferencesSlice = createSlice({
  name: 'optionPreferences',
  initialState: {
    genreIdOrCategoryName: 'popular',
    page: 1,
    searchQuery: '',
    language: '',
    media,
    browseMedia: '',
  },
  reducers: {
    toggleMedia: (state, action) => {
      state.genreIdOrCategoryName = 'popular';
      state.media = action.payload;
      state.searchQuery = '';
      state.language = '';
      state.browseMedia = '';
      sessionStorage.setItem('mediaTypePreference', action.payload);
    },
    selectGenreOrCategory: (state, action) => {
      state.genreIdOrCategoryName = action.payload;
      state.searchQuery = '';
    },
    searchMovie: (state, action) => {
      state.language = '';
      state.searchQuery = action.payload;
    },
    searchLanguage: (state, action) => {
      state.searchQuery = '';
      state.language = action.payload;
    },
    setBrowseMedia: (state, action) => {
      state.browseMedia = action.payload;
    },
  },
});

export const {
  selectGenreOrCategory,
  searchMovie,
  searchLanguage,
  toggleMedia,
  setBrowseMedia,
} = optionPreferencesSlice.actions;
export default optionPreferencesSlice;
