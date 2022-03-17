export interface FoodData {
  minimum_order_price: number;
  merchant_name: string;
  items: Items[];
  discounts: Discounts[];
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
  discountedFoodList?: DiscountedFoodList[];
}

export interface DiscountedFoodList {
  name: string;
  priceTimesQuantity: number;
  excludedPrices: number;
}

export interface CartFoodProps {
  name: string;
  price: number;
  quantity: number;
}
