import { ReactElement } from 'react';

import { Items } from '../Reducers/cartReducer';
import Food from './Food';

export default function Foods(props: { foodsList: Items[] }) {
  const foodsList = props.foodsList;
  const $foodsListArray = foodsList.map((food: Items): ReactElement<FoodProps> => {
    const {name, price, ..._} = food;
    return <Food key={name} name={name} price={price} />
  });

  return (
    <div>{$foodsListArray}</div>
  )
}

export interface FoodProps {
  name: string;
  price: number;
}
