import { createSlice } from '@reduxjs/toolkit';
import { getCombinedCreditsByCastId } from '../services';

const initialState = {
  peopleDetails: {
    peopleDetails: [],
    isLoading: false,
    isError: false,
  },
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCombinedCreditsByCastId.pending, (state) => {
        state.peopleDetails.isLoading = true;
      })
      .addCase(getCombinedCreditsByCastId.fulfilled, (state, action) => {
        state.peopleDetails.isLoading = false;
        state.peopleDetails.peopleDetails = action.payload;
      })
      .addCase(getCombinedCreditsByCastId.rejected, (state) => {
        state.peopleDetails.isLoading = false;
        state.peopleDetails.isError = true;
      });
  },
});

export { peopleSlice };
