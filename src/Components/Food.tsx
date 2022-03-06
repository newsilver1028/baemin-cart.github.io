import { ReactElement } from "react";
import { FoodProps } from './Foods';

export default function Food(props: FoodProps): ReactElement {
  const {name, price, onAdd} = props;
  
  return (
    <>
    <div id={name} onClick={onAdd}>{name}</div>
    <div id={name}>{price}</div>
    </>
  )
}