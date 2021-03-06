import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFoodData } from '../Async/fetchFoodData';

import { Discounts, Items } from '../Interface/cartInterface';
import { FoodList, InitialFoodData } from '../Interface/foodDataInterface';
import { FoodsTypeProps } from '../Interface/foodDataInterface';

const initialState = {
  foodData: {
    minimum_order_price: 0,
    merchant_name: "",
    items: [],
    discounts: []
  },
  sortedFoodsData: [],
  foodInCart : {
    foodList: [],
    totalPrice: 0,
    count: 0
  },
  isOverMinimum: false,
  isLoading: false,
  error: []
}

export const foodDataReducer = createSlice({
  name: 'foodDataReducer',
  initialState: initialState as InitialFoodData,
  reducers: {
    sortFoodData: (state) => {
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
      state.foodData.discounts.map((discount: Discounts): Discounts => {
        discount.isSelected = true;
        discount.excludedPrices = 0;
        return discount;
      })
    },
    updateTotalPrice: (state) => {
      const originalPrice = state.foodInCart!.foodList.reduce(
        (prev: number, current: FoodList) => prev + current.priceTimesQuantity,0);
      state.foodData.discounts.forEach((discount) => {
        if(discount.isSelected) {
          state.foodInCart!.totalPrice = originalPrice - discount.excludedPrices!; 
        }
      })
      state.isOverMinimum = state.foodData.minimum_order_price <= originalPrice;
    },
    addFoodInCart: (state, { payload }: PayloadAction<string>) => {
      const target = state.foodData.items.filter((item: Items) => item.name === payload)[0];
      const targetObject = {
        name: target.name,
        quantity: 1,
        price: target.price,
        priceTimesQuantity: target.price
      }
      state.foodInCart!.foodList.push(targetObject);
      state.foodInCart!.count++;
      state.foodData.discounts = state.foodData.discounts.map((discount: Discounts):Discounts => {
        const foodListElements = state.foodInCart!.foodList.map((food: FoodList) => {
          const excludedPrices = getExcludedPrice(food.priceTimesQuantity, discount.discount_rate)
          return {
            name: food.name,
            priceTimesQuantity: food.priceTimesQuantity,
            excludedPrices: excludedPrices,
            isSelected: true
          }
        });
        discount.discountedFoodList = foodListElements;
        return discount;
      })
    },
    deleteFoodInCart: (state, { payload }: PayloadAction<string>) => {
      state.foodInCart!.foodList = state.foodInCart!.foodList.filter((item:FoodList) => item.name !== payload);
      state.foodInCart!.count--;
    },
    increaseFoodQuantity: (state, { payload }: PayloadAction<string>) => {
      state.foodInCart!.foodList = state.foodInCart!.foodList.map((food: FoodList) => {
        if(food.name === payload) {
          food.quantity++;
          food.priceTimesQuantity = food.price * food.quantity;
        }
        return food;
      });
    },
    decreaseFoodQuantity: (state, { payload }: PayloadAction<string>) => {
      state.foodInCart!.foodList = state.foodInCart!.foodList.map((food: FoodList) => {
        if(food.name === payload) {
          if(food.quantity > 1) {
            food.quantity--;
            food.priceTimesQuantity = food.price * food.quantity;
          }
        }
        return food;
      });
    },
    selectDiscounts: (state, { payload }: PayloadAction<string>) => {
      state.foodData.discounts.map((discount) => {
        if(discount.name === payload) {
          discount.isSelected = !discount.isSelected;
        }
        return discount;
      });
    },
    selectFoodsForDiscount: (state, { payload }: PayloadAction<[string,string]>) => {
      const [dicountName, name] = payload;
      state.foodData.discounts.map((discount) => {
        if(discount.name === dicountName) {
          discount.discountedFoodList!.map((food) => {
            if(food.name === name) {
              food.isSelected = !food.isSelected;
            }
            if(food.isSelected) {
              discount.excludedPrices! -= food.excludedPrices;
            }
            return food;
          })
        }
        return discount;
      });
    },
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

function getExcludedPrice(price: number, rate: number): number {
  return Math.floor(rate * 0.01 * price);
}
