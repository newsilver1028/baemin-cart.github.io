import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Reducers';

const store = configureStore({ reducer: rootReducer })

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
);
