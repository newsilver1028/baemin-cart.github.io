import { useSelector } from 'react-redux';

import { ReactElement } from 'react';
import { CartData, StoredFoods, Items, initialState } from '../Reducers/cartReducer';
import { RootState } from '../Reducers';
import CartFood from './CartFood';

export default function CartList() {
  const { cartData } = useSelector((store: RootState) => store.cartReducer);
  const storedFoods = cartData.storedFoods;

  return (
    <>
    <div>======= cart list =======</div>
    <div>{
      storedFoods.map((food: StoredFoods): ReactElement<CartFoodProps> => {
        const name = food.name;
        const price = food.price; // 1000단위 마다 ,를 붙여야 함
        const quantitiy = food.quantitiy;
        return <CartFood key={name} name={name} price={price} quantitiy={quantitiy}/>
      })
      }</div>
    </>
  )
}

export interface CartFoodProps {
  name: string;
  price: number;
  quantitiy: number;
}
