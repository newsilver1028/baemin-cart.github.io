import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from "react-redux";
import { Action, ThunkDispatch, configureStore } from '@reduxjs/toolkit';
import rootReducer, { RootState } from './Reducers';
import { useDispatch } from 'react-redux';

const store = configureStore({ 
  reducer: rootReducer,
});

export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
