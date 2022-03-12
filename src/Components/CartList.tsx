import { useSelector } from 'react-redux';

import { ReactElement } from 'react';
import { StoredFoods } from '../Interface/cartInterface';
import { RootState } from '../Reducers';
import CartFood from './CartFood';
import { CartFoodProps } from '../Interface/cartInterface';

import { Box } from '@chakra-ui/react';

export default function CartList() {
  const { cartData } = useSelector((store: RootState) => store.cartReducer);
  const storedFoods = cartData.storedFoods;

  const $storedFoodsArray = storedFoods.map((food: StoredFoods): ReactElement<CartFoodProps> => {
    const {name, price, quantity} = food;
    return <CartFood key={name} name={name} price={price} quantity={quantity} />
  });

  return (
    <>
    <Box padding="10px" bg="white">
    <div>{$storedFoodsArray}</div>
    </Box>
    </>
  )
}


