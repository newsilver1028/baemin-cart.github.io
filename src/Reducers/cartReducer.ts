import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Data {
  foodData: FoodData;
  clickedFoods?: Items[];
  totalPrice?: number;
  isOverMinimum?: boolean;
}

export interface FoodData {
  minimum_order_price: number;
  merchant_name: string;
  items: Items[];
  discounts: Discounts[];
}

export interface Items {
  id: string;
  category_id: string;
  category_name: string;
  name: string;
  price: number;
}

export interface Discounts {
  id: string;
  name: string;
  discount_rate: number;
}

export const initialState = {
  foodData: {
    minimum_order_price: 0,
    merchant_name: "",
    items: [],
    discounts: []
  },
  clickedFoods: [],
  totalPrice: 0,
  isOverMinimum: false,
}

export const cartReducer = createSlice({
  name: 'cartReducer',
  initialState: initialState as Data,
  reducers: {
    STORE: (state, { payload }: PayloadAction<FoodData>) => {
      state.foodData = payload;
    },
    ADD: (state, { payload }: PayloadAction<string>) => {
      const target = state.foodData.items.filter((item: Items) => item.name === payload);
      state.clickedFoods?.push(...target);
    },
    DELETE: (state) => {
      return state;
    },
    INCREASE: (state) => {
      return state;
    },
    DECREASE: (state) => {
      return state;
    }
  }
});

export const { STORE, ADD, DELETE, INCREASE, DECREASE } = cartReducer.actions;
