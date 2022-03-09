import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { RootState } from '../Reducers';
import { cartReducer } from '../Reducers/cartReducer';
import { discountReducer } from '../Reducers/discountReducer';
import { foodDataReducer } from '../Reducers/foodDataReducer';
import { fetchFoodData } from '../Async/fetchFoodData';
import { useAppThunkDispatch } from '..';

import { Text } from '@chakra-ui/react'

export default function FoodsList() {
  const dispatch = useDispatch();
  const thunkDispatch = useAppThunkDispatch();
  const { foodData } = useSelector((store: RootState) => store.foodDataReducer);
  const { count } = useSelector((store: RootState) => store.cartReducer);

  const getFoodData = () => {
    thunkDispatch(fetchFoodData())
    .unwrap()
    .then((data) => {
      dispatch(cartReducer.actions.STORE(data));
      dispatch(foodDataReducer.actions.STORE());
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
    <div>
    <Text fontSize="2xl" fontWeight="semibold">{foodData.merchant_name}</Text>
    <div>Cart {count}</div>
    </div>
  );
}