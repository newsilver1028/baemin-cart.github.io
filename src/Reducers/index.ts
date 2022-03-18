import { combineReducers } from "redux";

import { foodDataReducer } from "./foodDataReducer";

const rootReducer = combineReducers({
  foodDataReducer: foodDataReducer.reducer,
} as any);

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
