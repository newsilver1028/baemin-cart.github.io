import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Data, FoodData, StoredFoods, Items } from '../Interface/cartInterface';

export const initialState = {
  foodData: {
    minimum_order_price: 0,
    merchant_name: "",
    items: [],
    discounts: []
  },
  count: 0,
  cartData: {
    storedFoods: [],
    totalPrice: 0,
    isOverMinimum: false
  },
  totalPrice: 0,
  isOverMinimum: false,
}

export const cartReducer = createSlice({
  name: 'cartReducer',
  initialState: initialState as Data,
  reducers: {
    STORE: (state, { payload }: PayloadAction<FoodData>) => {
      state.foodData = payload;
      state.count = 0;
      state.cartData = {
        storedFoods: [],
        totalPrice: 0,
        isOverMinimum: false
      }
    },
    UPDATE: (state) => {
      state.cartData!.totalPrice = state.cartData!.storedFoods.reduce(
        (prev, current) => prev + current.priceTimesQuantity,0);
      state.cartData!.isOverMinimum = state.foodData.minimum_order_price <= state.cartData!.totalPrice;
    },
    ADD: (state, { payload }: PayloadAction<string>) => {
      const target = state.foodData.items.filter((item: Items) => item.name === payload)[0];
      const targetObject = {
        name: target.name,
        quantitiy: 1,
        price: target.price,
        priceTimesQuantity: target.price
      }
      state.cartData!.storedFoods.push(targetObject);
      state.count!++;
    },
    DELETE: (state, { payload }: PayloadAction<string>) => {
      if (state.cartData !== undefined) {
        state.cartData.storedFoods = state.cartData.storedFoods.filter((item:StoredFoods) => item.name !== payload);
      }
    },
    INCREASE: (state, { payload }: PayloadAction<string>) => {
      state.cartData!.storedFoods = state.cartData!.storedFoods.map((food) => {
        if(food.name === payload) {
          food.quantitiy++;
          food.priceTimesQuantity = food.price * food.quantitiy;
        }
        return food;
      });
    },
    DECREASE: (state, { payload }: PayloadAction<string>) => {
      state.cartData!.storedFoods = state.cartData!.storedFoods.map((food) => {
        if(food.name === payload) {
          food.quantitiy--;
          food.priceTimesQuantity = food.price * food.quantitiy;
        }
        return food;
      });
    }
  }
});
