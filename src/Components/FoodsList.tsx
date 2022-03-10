import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { RootState } from '../Reducers';
import { cartReducer } from '../Reducers/cartReducer';
import { discountReducer } from '../Reducers/discountReducer';
import { foodDataReducer } from '../Reducers/foodDataReducer';
import { fetchFoodData } from '../Async/fetchFoodData';
import { useAppThunkDispatch } from '..';

import { Heading } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

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
    <Box 
    display="flex" 
    alignItems="baseline" 
    justifyContent="space-between"
    padding="10px"
    bg="white">
      <Heading as="h1" size="xl" bg="white">{foodData.merchant_name}</Heading>
      <div>Cart {count}</div>
    </Box>
  );
}