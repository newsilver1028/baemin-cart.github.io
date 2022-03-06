import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DiscountsData {
  discounts: Discounts[];
}

export interface Discounts {
  id: string;
  name: string;
  discount_rate: number;
}

export const initialState = {
  discounts: []
}

export const discountReducer = createSlice({
  name: 'discountReducer',
  initialState: initialState as DiscountsData,
  reducers: {
    STORE: (state, { payload }: PayloadAction<DiscountsData>) => {
      return state;
    },
  }
});
