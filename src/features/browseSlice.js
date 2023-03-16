import { createSlice } from '@reduxjs/toolkit';
import { getSearchList, getFilteredMovies, getAllTrending } from '../services';

const initialState = {
  allContent: {
    allContent: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
};

const browseSlice = createSlice({
  name: 'browse',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSearchList.pending, (state) => {
        state.allContent.isLoading = true;
      })
      .addCase(getSearchList.fulfilled, (state, action) => {
        state.allContent.isLoading = false;
        state.allContent.isSuccess = true;
        state.allContent.allContent = action.payload;
      })
      .addCase(getSearchList.rejected, (state) => {
        state.allContent.isLoading = false;
        state.allContent.isError = true;
      })

      .addCase(getFilteredMovies.pending, (state) => {
        state.allContent.isLoading = true;
      })
      .addCase(getFilteredMovies.fulfilled, (state, action) => {
        state.allContent.isLoading = false;
        state.allContent.isSuccess = true;
        state.allContent.allContent = action.payload;
      })
      .addCase(getFilteredMovies.rejected, (state) => {
        state.allContent.isLoading = false;
        state.allContent.isError = true;
      })

      .addCase(getAllTrending.pending, (state) => {
        state.allContent.isLoading = true;
      })
      .addCase(getAllTrending.fulfilled, (state, action) => {
        state.allContent.isLoading = false;
        state.allContent.isSuccess = true;
        state.allContent.allContent = action.payload;
      })
      .addCase(getAllTrending.rejected, (state) => {
        state.allContent.isLoading = false;
        state.allContent.isError = true;
      });
  },
});

export { browseSlice };
