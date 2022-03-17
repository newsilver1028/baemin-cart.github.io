export interface Discounts {
  id: string;
  name: string;
  discount_rate: number;
  discountedFoodList?: DiscountedFood;
  excludedPrices?: number;
  isSelected?: boolean;
}

export interface DiscountedFood {
  name: string;
  pricesTimesQuantity: number;
  excludedPrices: number;
  isSelected: boolean;
}
