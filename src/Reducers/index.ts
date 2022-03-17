import { combineReducers } from "redux";

import { foodDataReducer } from "./foodDataReducer";
import { discountReducer } from "./discountReducer";


const rootReducer = combineReducers({
  foodDataReducer: foodDataReducer.reducer,
  discountReducer: discountReducer.reducer,
} as any);

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
