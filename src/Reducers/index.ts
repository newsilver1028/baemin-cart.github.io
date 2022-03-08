import { combineReducers } from "redux";

import { foodDataReducer } from "./foodDataReducer";
import { cartReducer } from "./cartReducer";
import { discountReducer } from "./discountReducer";


const rootReducer = combineReducers({
  foodDataReducer: foodDataReducer.reducer,
  cartReducer: cartReducer.reducer,
  discountReducer: discountReducer.reducer,
} as any);

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
