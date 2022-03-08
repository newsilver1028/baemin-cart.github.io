import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFoodData } from '../Async/fetchFoodData';

import { Discounts } from './cartReducer';

export interface InitialFoodData {
  foodData : {
    discounts: Discounts[]
  },
  isLoading: boolean,
  error?: unknown
}

const initialState = {
  foodData: {
    discounts: []
  },
  isLoading: false,
  error: []
}

export const discountsDataReducer = createSlice({
  name: 'foodDataReducer',
  initialState: initialState as InitialFoodData,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFoodData.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchFoodData.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.foodData = payload;
    })
    .addCase(fetchFoodData.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    })
  }
});
