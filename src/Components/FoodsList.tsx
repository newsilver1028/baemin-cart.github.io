import { useSelector, useDispatch } from 'react-redux';
import { useContext, useEffect } from 'react';

import { RootState } from '../Reducers';
import { cartReducer } from '../Reducers/cartReducer';
import { discountReducer } from '../Reducers/discountReducer';
import { foodDataReducer } from '../Reducers/foodDataReducer';
import { fetchFoodData } from '../Async/fetchFoodData';
import { useAppThunkDispatch } from '..';

import { Heading, Flex, Text, Badge, Box } from '@chakra-ui/react';
import { OpenCartContext } from './Context/OpenCartContext';

export default function FoodsList() {
  const dispatch = useDispatch();
  const thunkDispatch = useAppThunkDispatch();
  const {isOpen, onOpen} = useContext(OpenCartContext);
  const { foodData, foodInCart } = useSelector((store: RootState) => store.foodDataReducer);
  const count = foodInCart.count;

  const getFoodData = () => {
    thunkDispatch(fetchFoodData())
    .unwrap()
    .then((data) => {
      // 주석 처리
      dispatch(cartReducer.actions.STORE(data));
      dispatch(foodDataReducer.actions.sortFoodData());
    })
    .catch((reject) => {
      console.log(reject);
    })
  }

  // 주석 처리
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
    // 주석 처리
    getDiscountsData();
    getFoodData();
  },[]);

  return (
    <Box>
      <Flex 
      alignItems="baseline" 
      justifyContent="space-between"
      padding="10px"
      bg="white">
        <Heading as="h1" size="xl" bg="white">{foodData.merchant_name}</Heading>
        <Flex alignItems="center" onClick={onOpen} cursor="pointer">
          <Text fontSize="lg" fontWeight="bold">Cart</Text>
          <Badge colorScheme="facebook" ml="1">{count}</Badge>
        </Flex>
      </Flex>
    </Box>
  );
}