import { StoredFoods } from "./cartInterface";

export interface DiscountsData {
  discounts: Discounts[];
  totalPrice?: number;
  storedFoods?: StoredFoods[]
}

export interface Discounts {
  id: string;
  name: string;
  discount_rate: number;
  discountedMenu?: DiscountedMenu[];
  discountedPrices?: number;
}

export interface DiscountedMenu {
  name: string;
  discountedPrice: number;
  excludedPrice: number;
}
