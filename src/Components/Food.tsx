import { ReactElement } from "react";
import { FoodProps } from './Foods';

export default function Food(props: FoodProps): ReactElement {
  const {name, price, onAdd} = props;
  
  return (
    <div>
    <span id={name} onClick={onAdd}>{name} : </span>
    <span id={name+"price"}>{price}</span>
    </div>
  )
}