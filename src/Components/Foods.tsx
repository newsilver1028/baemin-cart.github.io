import { ReactElement } from 'react';

import { Items } from '../Interface/cartInterface';
import Food from './Food';
import { Box } from '@chakra-ui/react';

export default function Foods(props: { foodsList: Items[] }) {
  const foodsList = props.foodsList;
  const $foodsListArray = foodsList.map((food: Items): ReactElement<FoodProps> => {
    const {name, price, ..._} = food;
    return <Food key={name} name={name} price={price} />
  });

  return <Box>{$foodsListArray}</Box>;
}

export interface FoodProps {
  name: string;
  price: number;
}
