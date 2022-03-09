import { useSelector } from 'react-redux';

import { ReactElement } from 'react';
import { StoredFoods } from '../Reducers/cartReducer';
import { RootState } from '../Reducers';
import CartFood from './CartFood';

export default function CartList() {
  const { cartData } = useSelector((store: RootState) => store.cartReducer);
  const storedFoods = cartData.storedFoods;

  const $storedFoodsArray = storedFoods.map((food: StoredFoods): ReactElement<CartFoodProps> => {
    const {name, price, quantitiy} = food;
    return <CartFood key={name} name={name} price={price} quantitiy={quantitiy} />
  });

  return (
    <>
    <div>{$storedFoodsArray}</div>
    </>
  )
}

export interface CartFoodProps {
  name: string;
  price: number;
  quantitiy: number;
}
