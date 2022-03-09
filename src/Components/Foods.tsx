import { useSelector, useDispatch } from 'react-redux';
import { ReactElement } from 'react';

import { cartReducer } from '../Reducers/cartReducer';
import { RootState } from '../Reducers';
import { Items } from '../Reducers/cartReducer';
import Food from './Food';
import { discountReducer } from '../Reducers/discountReducer';

export default function Foods(props: { foodsList: Items[] }) {
  const dispatch = useDispatch();
  const foodsList = props.foodsList;
  const { cartData } = useSelector((store: RootState) => store.cartReducer);
  const storedFoods = cartData.storedFoods;

  const onAdd = (target: string) => {
    dispatch(cartReducer.actions.ADD(target));
    dispatch(cartReducer.actions.UPDATE());
    dispatch(discountReducer.actions.ADD(storedFoods));
  } 

  function addCartClickHandler(event: React.MouseEventHandler<HTMLDivElement>): void {
    const target = event.target.id;
    const isOverlapped = storedFoods.filter((item: Items) => item.name === target).length !== 0;
    if (isOverlapped) {
      alert("이미 장바구니에 등록된 상품입니다.");
      return;
    }
    onAdd(target);
  }
  
  return (
    <div>
      {foodsList.map((food: Items): ReactElement<FoodProps> => {
        const {name, price, ..._} = food;
        return <Food key={name} name={name} price={price} onAdd={addCartClickHandler} />
      })}
    </div>
  )
}

export interface FoodProps {
  name: string;
  price: number;
  onAdd: React.MouseEventHandler<HTMLDivElement>;
}
