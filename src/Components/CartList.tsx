import { useSelector } from 'react-redux';
import { ReactElement } from 'react';
import { RootState } from '../Reducers';
import { FoodList } from '../Interface/foodDataInterface';
import CartFood from './CartFood';
import { CartFoodProps } from '../Interface/cartInterface';

import { Box } from '@chakra-ui/react';

export default function CartList() {
  const { foodInCart } = useSelector((store: RootState) => store.foodDataReducer);
  const foodList = foodInCart.foodList;

  const $foodInCartArray = foodList.map((food: FoodList): ReactElement<CartFoodProps> => {
    const {name, price, quantity} = food;
    return <CartFood key={name} name={name} price={price} quantity={quantity} />
  });

  return (
    <>
    <Box padding="10px" bg="white">
    <div>{ $foodInCartArray }</div>
    </Box>
    </>
  )
}


