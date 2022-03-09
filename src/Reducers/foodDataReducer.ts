import { createSlice } from '@reduxjs/toolkit';
import { fetchFoodData } from '../Async/fetchFoodData';

import { Items } from '../Interface/cartInterface';
import { InitialFoodData } from '../Interface/foodDataInterface';
import { FoodsTypeProps } from '../Interface/foodDataInterface';

const initialState = {
  foodData: {
    minimum_order_price: 0,
    merchant_name: "",
    items: [],
    discounts: []
  },
  sortedFoodsData: [],
  isLoading: false,
  error: []
}

export const foodDataReducer = createSlice({
  name: 'foodDataReducer',
  initialState: initialState as InitialFoodData,
  reducers: {
    STORE: (state) => {
      const foodItemsNameArray = state.foodData.items.map((item: Items) :string=> {
        return item.category_name;
      });
      const FOODS_TYPES = Array.from(new Set([...foodItemsNameArray]));
      state.sortedFoodsData = FOODS_TYPES.map((type:string) : FoodsTypeProps => {
        const FOODS_LIST = state.foodData.items.filter((item: Items) => item.category_name === type) 
        return {
          type: type,
          foodList: FOODS_LIST
        }
      });
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
