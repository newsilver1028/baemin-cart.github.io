import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Data {
  foodData: FoodData;
  count: number;
  cartData?: CartData;
}

export interface FoodData {
  minimum_order_price: number;
  merchant_name: string;
  items: Items[];
  discounts: Discounts[];
}

export interface CartData {
  storedFoods: StoredFoods[],
  totalPrice?: number;
  isOverMinimum?: boolean;
}

export interface StoredFoods {
  name: string;
  quantitiy: number;
  price: number;
  priceTimesQuantity: number;
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
    },
    ADD: (state, { payload }: PayloadAction<string>) => {
      const target = state.foodData.items.filter((item: Items) => item.name === payload)[0];
      const targetObject = {
        name: target.name,
        quantitiy: 1,
        price: target.price,
        priceTimesQuantity: target.price
      }
      state.cartData?.storedFoods.push(targetObject);
      state.count++;
      if(state.cartData !== undefined) {
        state.cartData.totalPrice = state.cartData.storedFoods.reduce(
          (prev, current) => prev + current.priceTimesQuantity,0);
        state.cartData.isOverMinimum = state.foodData.minimum_order_price <= state.cartData.totalPrice;
      }
    },
    DELETE: (state, { payload }: PayloadAction<string>) => {
      if (state.cartData !== undefined) {
        state.cartData.storedFoods = state.cartData.storedFoods.filter((item:StoredFoods) => item.name !== payload);
        state.cartData.isOverMinimum = state.foodData.minimum_order_price <= state.cartData.totalPrice!;
      }
    },
    INCREASE: (state, { payload }: PayloadAction<string>) => {
      const target = state.cartData?.storedFoods.filter((item:StoredFoods) => item.name === payload)[0] !;
      target.quantitiy++;
      target.priceTimesQuantity = target.price * target.quantitiy;
      if (state.cartData !== undefined) {
        state.cartData.totalPrice = state.cartData.storedFoods.reduce(
          (prev, current) => prev + current.priceTimesQuantity,0);
        state.cartData.isOverMinimum = state.foodData.minimum_order_price <= state.cartData.totalPrice;
      }
    },
    DECREASE: (state, { payload }: PayloadAction<string>) => {
      const target = state.cartData?.storedFoods.filter((item:StoredFoods) => item.name === payload)[0] !;
      if (target.quantitiy === 1) return;
      target.quantitiy--;
      target.priceTimesQuantity = target.price * target.quantitiy;
      if (state.cartData !== undefined) {
        state.cartData.totalPrice = state.cartData.storedFoods.reduce(
          (prev, current) => prev + current.priceTimesQuantity,0);
        state.cartData.isOverMinimum = state.foodData.minimum_order_price <= state.cartData.totalPrice;
      }
    }
  }
});
