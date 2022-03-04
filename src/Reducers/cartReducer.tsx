import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import rootReducer from '.';

interface Data {
  data: object;
  clickedFood: object;
  totalPrice: number;
  isOverMinimum: boolean;
}

interface FoodData {
  
}

const initialState = {
  data: {},
  clickedFood: {},
  totalPrice: 0,
  isOverMinimum: false,
}

export const cartReducer = createSlice({
  name: 'cartReducer',
  initialState: initialState as Data,
  reducers: {
    STORE: (state, { payload }: PayloadAction<{name: string}>) => {
      return state;
    },
    ADD: (state, { payload }: PayloadAction<{name: string}>) => {
      return state;
    },
    DELETE: (state, { payload }: PayloadAction<{name: string}>) => {
      return state;
    },
    INCREASE: (state, { payload }: PayloadAction<{name: string}>) => {
      return state;
    },
    DECREASE: (state, { payload }: PayloadAction<{name: string}>) => {
      return state;
    }
  }
});

// export type RootState = ReturnType<typeof rootReducer>;
