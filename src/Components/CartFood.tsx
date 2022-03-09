import { useDispatch } from 'react-redux';
import { ReactElement } from "react"

import { cartReducer } from '../Reducers/cartReducer';
import { CartFoodProps } from "./CartList"

export default function CartFood(props: CartFoodProps): ReactElement {
  const {name, price, quantitiy } = props;
  const dispatch = useDispatch();

  const onIncrease = (target: string): void => {
    dispatch(cartReducer.actions.INCREASE(target));
  } 

  const onDecrease = (target: string): void => {
    dispatch(cartReducer.actions.DECREASE(target));
  }

  const onDelete = (target: string): void => {
    dispatch(cartReducer.actions.DELETE(target));
  }

  return (
    <>
    <div id={name}>{name}</div>
    <div id={name}>{price}</div>
    <div id={name} onClick={() => onDelete(name)}>X</div>
    <button type="button" onClick={() => onDecrease(name)}>-</button>
    <span>{quantitiy}</span>
    <button type="button" onClick={() => onIncrease(name)}>+</button>
    </>
  )
}