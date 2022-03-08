import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit'

import { Data, FoodData, Discounts, Items, initialState } from '../Reducers/cartReducer';
import { cartReducer } from '../Reducers/cartReducer';
import { RootState } from '../Reducers';

// get discountsData
import { discountReducer } from '../Reducers/discountReducer';

// thunk 
import { fetchFoodData } from '../Async/fetchFoodData';
import { foodDataReducer } from '../Reducers/foodDataReducer';
import { useEffect } from 'react';
import { useAppThunkDispatch } from '..';
import { fetchDiscountsData } from '../Async/fetchDiscounsData';

export default function FoodsList() {
  const dispatch = useDispatch();
  const thunkDispatch = useAppThunkDispatch();
  const { foodData } = useSelector((store: RootState) => store.foodDataReducer);
  const { count } = useSelector((store: RootState) => store.cartReducer);
  const { discounts } = useSelector((store: RootState) => store.discountReducer);

  const getFoodData = () => {
    thunkDispatch(fetchFoodData())
    .unwrap()
    .then((data) => {
      dispatch(cartReducer.actions.STORE(data));
    })
    .catch((reject) => {
      console.log(reject);
    })
  }

  const getDiscountsData = () => {
    thunkDispatch(fetchFoodData())
    .unwrap()
    .then((data) => {
      dispatch(discountReducer.actions.STORE(data));
    })
    .catch((reject) => {
      console.log(reject);
    })
  }

  useEffect(()=> {
    getDiscountsData();
    getFoodData();
  },[]);

  return (
    <>
    <div>{foodData.merchant_name}</div>
    <div>Cart {count}</div>
    </>
  );
}