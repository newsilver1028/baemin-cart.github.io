import { useSelector, useDispatch } from 'react-redux';

import { Data, FoodData, Discounts, Items, initialState } from '../Reducers/cartReducer';
import { cartReducer } from '../Reducers/cartReducer';
import { RootState } from '../Reducers';

// get discountsData
import { discountReducer } from '../Reducers/discountReducer';

// thunk 
import { fetchFoodData } from '../Async/fetchFoodData';
import { unwrapResult } from '@reduxjs/toolkit';

export default function FoodsList() {
  const dispatch = useDispatch();
  const { foodData } = useSelector((store: RootState) => store.foodDataReducer);
  const { count } = useSelector((store: RootState) => store.cartReducer);

  const onStore = (data: FoodData) => {
    // dispatch(fetchFoodData());
    dispatch(cartReducer.actions.STORE(data));
    // get discountsData
    dispatch(discountReducer.actions.STORE(data.discounts));
  }

  const getFoodData = async () => {
    try{
    await dispatch(fetchFoodData());
    await onStore(foodData);
    } catch(error) {
      console.log(error);
    }
  }

  getFoodData();

  return (
    <>
    <div>{foodData.merchant_name}</div>
    <div>Cart {count}</div>
    </>
  );
}