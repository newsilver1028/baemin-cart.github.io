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
  const {isOpen, onOpen} = useContext(OpenCartContext);
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