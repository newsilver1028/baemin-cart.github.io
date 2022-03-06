import { combineReducers } from "redux";

import { cartReducer } from "./cartReducer";
import { discountReducer } from "./discountReducer";

const rootReducer = combineReducers({
  cartReducer: cartReducer.reducer,
  discountReducer: discountReducer.reducer
} as any);

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
