import { useSelector, useDispatch } from 'react-redux';
import { ReactElement } from "react"

import { cartReducer } from '../Reducers/cartReducer';
import { RootState } from '../Reducers';
import { CartFoodProps } from "./CartList"
import { discountReducer } from '../Reducers/discountReducer';

export default function CartFood(props: CartFoodProps): ReactElement {
  const {name, price, quantitiy } = props;

  const dispatch = useDispatch();
  const { cartData } = useSelector((store: RootState) => store.cartReducer);
  const storedFoods = cartData.storedFoods;

  const onIncrease = (target: string): void => {
    dispatch(cartReducer.actions.INCREASE(target));
    dispatch(cartReducer.actions.UPDATE());
    // dispatch(discountReducer.actions.UPDATE(storedFoods));
  } 
  const temp = () => {
    console.log(storedFoods);
    dispatch(discountReducer.actions.UPDATE(storedFoods));
  }

  const onDecrease = (target: string): void => {
    dispatch(cartReducer.actions.DECREASE(target));
    dispatch(cartReducer.actions.UPDATE());
    // dispatch(discountReducer.actions.UPDATE(storedFoods));
  }

  const onDelete = (target: string): void => {
    dispatch(cartReducer.actions.DELETE(target));
    dispatch(cartReducer.actions.UPDATE());
    // dispatch(discountReducer.actions.UPDATE(storedFoods));
  }

  function deleteButtonClickHandler() {
    onDelete(name);
    // dispatch(cartReducer.actions.UPDATE());
    dispatch(discountReducer.actions.UPDATE(storedFoods));
  }

  function increaseButtonClickHandler() {
    onIncrease(name);
    // dispatch(cartReducer.actions.UPDATE());
    // console.log(storedFoods);
    // dispatch(discountReducer.actions.UPDATE(storedFoods));
    temp();
  }

  function decreaseButtonClickHandler() {
    onDecrease(name);
    // dispatch(cartReducer.actions.UPDATE());
    dispatch(discountReducer.actions.UPDATE(storedFoods));
  }

  return (
    <>
    <div id={name}>{name}</div>
    <div id={name}>{price}</div>
    <div onClick={deleteButtonClickHandler}>X</div>
    <button type="button" onClick={decreaseButtonClickHandler}>-</button>
    <span>{quantitiy}</span>
    <button type="button" onClick={increaseButtonClickHandler}>+</button>
    </>
  )
}