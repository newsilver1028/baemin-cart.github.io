import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartData, StoredFoods } from './cartReducer';

export interface DiscountsData {
  discounts: Discounts[];
  totalPrice?: number;
}

export interface Discounts {
  id: string;
  name: string;
  discount_rate: number;
  discountedMenu?: DiscountedMenu[];
  discountedPrices?: number;
}

export interface DiscountedMenu {
  name: string;
  discountedPrice: number;
  excludedPrice: number;
}

export const initialState = {
  discounts: [],
  totalPrice: 0,
}

function getDiscountedPrice(price: number, rate: number): number {
  return Math.floor((100 - rate) * 0.01 * price);
}

function getExcludedPrice(totalPrice: number, discountedPrice: number): number {
  return Math.floor(totalPrice - discountedPrice);
}

export const discountReducer = createSlice({
  name: 'discountReducer',
  initialState: initialState as DiscountsData,
  reducers: {
    STORE: (state, { payload }: PayloadAction<Discounts[]>) => {
      state.discounts = payload.map(discount => {
        return {
          ...discount,
          discountedMenu: [],
          discountedPrices: 0
        }
      })
    },
    UPDATE: (state, { payload }: PayloadAction<StoredFoods[]>) => {
      state.discounts.forEach((discount) => {
        payload.forEach((food) => {
          const discountedPrice = getDiscountedPrice(food.priceTimesQuantity,discount.discount_rate);
          const excludedPrice = getExcludedPrice(food.priceTimesQuantity, discountedPrice);
          const menuObject = {
            name: food.name,
            discountedPrice: discountedPrice,
            excludedPrice: excludedPrice
          }          
          discount.discountedMenu!.push(menuObject);
          discount.discountedPrices! += discountedPrice;
        })
      })
    }
  }
});
