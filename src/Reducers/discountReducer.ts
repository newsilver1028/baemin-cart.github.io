import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DiscountsData, Discounts } from '../Interface/discountInterface'
import { FoodData, StoredFoods } from '../Interface/cartInterface';

export const initialState = {
  discounts: [],
  totalPrices: 0,
  excludedPrices: 0,
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
          excludedPrices: 0,
          totalPrices:0,
          isSelected: true
        }
      })
    },
    UPDATE: (state, { payload }: PayloadAction<StoredFoods[]>) => {
      state.storedFoods = payload;
      state.discounts = state.discounts.map((discount) => {
        discount.discountedMenu = payload.map(food => {
          const discountedPrice = getDiscountedPrice(food.priceTimesQuantity,discount.discount_rate);
          const excludedPrice = getExcludedPrice(food.priceTimesQuantity, discountedPrice);
          return {
            name: food.name,
            quantity: food.quantity,
            prices: food.priceTimesQuantity,
            discountedPrices: discountedPrice,
            excludedPrices: excludedPrice,
            totalPrices: 0
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
            discountedPrices: discountedPrice,
            excludedPrices: excludedPrice
          }
          discount.discountedMenu!.push(menuObject);   
        });
        return discount;
      })
    },
    SELECT_DISCOUNTS: (state, { payload }: PayloadAction<string>) => {
      state.discounts.map((discount) => {
        if(discount.name === payload) {
          discount.isSelected = !discount.isSelected;
        }
        return discount;
      });
    },
    SELECT_MENU: (state, { payload }: PayloadAction<string>) => {
      state.discounts.map((discount) => {
        discount.discountedPrices= 0;
        discount.discountedMenu!.map((menu) => {
          if(menu.name === payload) {
            menu.isSelected = !menu.isSelected;
          }
        })
      })
    },
    COMPUTE_PRICE: (state) => {
      state.totalPrices = 0;
      state.totalPrices! = state.storedFoods!.reduce(((prev, current) => prev + current.priceTimesQuantity),0);
      state.discounts = state.discounts.map((discount) => {
        discount.discountedMenu! = discount.discountedMenu!.map((menu) => {
          if(menu.isSelected) {
            discount.excludedPrices! += menu.excludedPrices;
          }
          return menu;
        });
        if(discount.isSelected) {
          state.totalPrices! -= discount.excludedPrices!;
        }
        return discount;
      });
      console.log("total",state.totalPrices);
    }
  }
});

function getDiscountedPrice(price: number, rate: number): number {
  return Math.floor((100 - rate) * 0.01 * price);
}

function getExcludedPrice(totalPrice: number, discountedPrice: number): number {
  return Math.floor(totalPrice - discountedPrice);
}
