import { FoodData, Items } from "./cartInterface";

export interface InitialFoodData {
  foodData: FoodData;
  sortedFoodsData: FoodsTypeProps[];
  foodInCart?: FoodInCart,
  isOverMinimum: boolean; 
  isLoading: boolean;
  error?: unknown;
}

export interface FoodsTypeProps {
  type: string;
  foodList: Items[];
}

export interface FoodInCart {
  foodList: FoodList[];
  totalPrice: number;
  count: number;
}

export interface FoodList {
  name: string;
  quantity: number;
  price: number;
  priceTimesQuantity: number;
}
