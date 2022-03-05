import { combineReducers } from "redux";

import { cartReducer } from "./cartReducer";

const rootReducer = combineReducers({
  cartReducer: cartReducer.reducer,
} as any);

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
