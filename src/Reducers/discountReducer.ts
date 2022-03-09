import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DiscountsData, Discounts } from '../Interface/discountInterface'
import { FoodData, StoredFoods } from '../Interface/cartInterface';

export const initialState = {
  discounts: [],
  totalPrice: 0,
  storedFoods: []
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
          discountedPrices: 0,
          selectedMenu: []
        }
      })
    },
    UPDATE: (state, { payload }: PayloadAction<StoredFoods[]>) => {
      state.storedFoods = payload;
      state.discounts = state.discounts.map((discount) => {
        discount.discountedMenu = payload.map(food => {
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
        });
        return discount;
      })
    }
  },
});

function getDiscountedPrice(price: number, rate: number): number {
  return Math.floor((100 - rate) * 0.01 * price);
}

function getExcludedPrice(totalPrice: number, discountedPrice: number): number {
  return Math.floor(totalPrice - discountedPrice);
}
