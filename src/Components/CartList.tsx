import { useSelector } from 'react-redux';

import { ReactElement } from 'react';
import { CartData, StoredFoods, Items, initialState } from '../Reducers/cartReducer';
import { RootState } from '../Reducers';
import CartFood from './CartFood';
import DiscountsList from './DiscountsList';

export default function CartList() {
  const { cartData } = useSelector((store: RootState) => store.cartReducer);
  const storedFoods = cartData.storedFoods;
  const $storedFoodsArray = storedFoods.map((food: StoredFoods): ReactElement<CartFoodProps> => {
    const {name, price, quantitiy} = food;
    // price - 1000단위 마다 ,를 붙여야 함
    return <CartFood key={name} name={name} price={price} quantitiy={quantitiy} />});

  return (
    <>
    <div>======= cart list =======</div>
    <div>{$storedFoodsArray}</div>
    <DiscountsList />
    </>
  )
}

export interface CartFoodProps {
  name: string;
  price: number;
  quantitiy: number;
}
