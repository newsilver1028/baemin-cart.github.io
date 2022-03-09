import { FoodData, Items } from "./cartInterface";

export interface InitialFoodData {
  foodData: FoodData;
  sortedFoodsData: FoodsTypeProps[];
  isLoading: boolean;
  error?: unknown;
}

export interface FoodsTypeProps {
  type: string;
  foodList: Items[];
}
