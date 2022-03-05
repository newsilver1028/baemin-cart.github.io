import { useSelector, useDispatch } from 'react-redux';
import { ReactElement } from 'react';

import { STORE, ADD, DELETE, INCREASE, DECREASE } from '../Reducers/cartReducer';
import { cartReducer } from '../Reducers/cartReducer';
import { RootState } from '../Reducers';
import { Data, FoodData, Discounts, Items, initialState } from '../Reducers/cartReducer';

export default function Foods(props: Items) {
  const dispatch = useDispatch();
  const foodsList = props.foodsList;

  const { foodData } = useSelector((store: RootState) => store.cartReducer);
  const { clickedFoods } = useSelector((store: RootState) => store.cartReducer);

  const onAdd = (target: string) => {
    dispatch(cartReducer.actions.ADD(target));
  } 

  function addCartClickHandler(e: React.MouseEventHandler<HTMLDivElement>): void {
    const target = e.target.id;
    const isOverlapped = clickedFoods.filter((item: Items) => item.name === target).length !== 0;
    if (isOverlapped) {
      alert("이미 장바구니에 등록된 상품입니다.");
      return;
    }
    onAdd(target);
  }
  
  return (
    <div>
      {foodsList.map((food: Items): ReactElement => {
        const name = food.name;
        return <div key={name} id={name} onClick={addCartClickHandler}>{name}</div>
      })}
    </div>
  )
}
