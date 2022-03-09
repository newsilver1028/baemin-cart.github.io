import { ReactElement } from "react";
import { FoodProps } from './Foods';

import { useSelector, useDispatch } from 'react-redux';

import { cartReducer } from '../Reducers/cartReducer';
import { RootState } from '../Reducers';
import { Items } from '../Reducers/cartReducer';
import { discountReducer } from '../Reducers/discountReducer';

export default function Food(props: FoodProps): ReactElement {
  const {name, price } = props;
  const dispatch = useDispatch();
  const { cartData } = useSelector((store: RootState) => store.cartReducer);
  const storedFoods = cartData.storedFoods;

  const onAdd = (target: string) => {
    dispatch(cartReducer.actions.ADD(target));
    dispatch(cartReducer.actions.UPDATE());
    dispatch(discountReducer.actions.ADD(storedFoods));
  } 

  function addCartClickHandler(event: any): void {
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
    <span id={name} onClick={addCartClickHandler}>{name} : </span>
    <span id={name+"price"}>{price}</span>
    </div>
  )
}
