export interface Data {
  foodData: FoodData;
  count?: number;
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
