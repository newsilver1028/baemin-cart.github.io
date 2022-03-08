import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FoodData, StoredFoods } from './cartReducer';

export interface DiscountsData {
  discounts: Discounts[];
  totalPrice?: number;
  storedFoods?: StoredFoods[]
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
    STORE: (state, { payload }: PayloadAction<FoodData>) => {
      const data = payload.discounts;
      state.discounts = data.map((discount: Discounts) => {
        return {
          ...discount,
          discountedMenu: [],
          discountedPrices: 0
        }
      })
    },
    UPDATE: (state, { payload }: PayloadAction<StoredFoods[]>) => {
      state.storedFoods = payload;
      state.discounts = state.discounts.map((discount) => {
        discount.discountedMenu = state.storedFoods!.map(food => {
          const discountedPrice = getDiscountedPrice(food.priceTimesQuantity,discount.discount_rate);
          const excludedPrice = getExcludedPrice(food.priceTimesQuantity, discountedPrice);
          discount.discountedPrices! += discountedPrice;
          return {
            name: food.name,
            discountedPrice: discountedPrice,
            excludedPrice: excludedPrice
          }
        });
        return discount;

      })

    },
    ADD: (state, { payload }: PayloadAction<StoredFoods[]>) => {
      state.storedFoods = payload;
      state.discounts = state.discounts.map((discount) => {
        state.storedFoods!.forEach((food) => {
          const discountedPrice = getDiscountedPrice(food.priceTimesQuantity,discount.discount_rate);
          const excludedPrice = getExcludedPrice(food.priceTimesQuantity, discountedPrice);
          const menuObject = {
            name: food.name,
            discountedPrice: discountedPrice,
            excludedPrice: excludedPrice
          }
          discount.discountedMenu!.push(menuObject);   
          discount.discountedPrices! += discountedPrice;
        });
        return discount;
      })
    }
  },
});
