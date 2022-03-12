import { StoredFoods } from "./cartInterface";

export interface DiscountsData {
  discounts: Discounts[];
  totalPrices?: number;
  excludedPrices: number;
  storedFoods?: StoredFoods[]
}

export interface Discounts {
  id: string;
  name: string;
  discount_rate: number;
  discountedMenu?: DiscountedMenu[];
  discountedPrices?: number;
  excludedPrices?: number;
  totalPrices?: number;
  isSelected?: boolean;
}

export interface DiscountedMenu {
  name: string;
  prices?: number;
  discountedPrices?: number;
  totalPrices?: number;
  excludedPrices: number;
  isSelected?: boolean;
}
