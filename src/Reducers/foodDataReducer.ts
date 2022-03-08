import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFoodData } from '../Async/fetchFoodData';

import { FoodData } from './cartReducer';
import { FoodDataError } from '../Async/fetchFoodData';

export interface InitialFoodData {
  foodData: FoodData,
  isLoading: boolean,
  error?: unknown
}

const initialState = {
  foodData: {
    minimum_order_price: 0,
    merchant_name: "",
    items: [],
    discounts: []
  },
  isLoading: false,
  error: []
}

export const foodDataReducer = createSlice({
  name: 'foodDataReducer',
  initialState: initialState as InitialFoodData,
  reducers: {
    STORE: (state, { payload }: PayloadAction<FoodData>) => {
      state.foodData = payload;
    }
  },
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
