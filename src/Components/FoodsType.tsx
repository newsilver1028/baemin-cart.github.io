import Foods from './Foods';
import { FoodsTypeProps } from '../Interface/foodDataInterface';

import { Text } from '@chakra-ui/react'

export default function FoodsType(props: FoodsTypeProps ) {
  const {type, foodList} = props;

  return(
    <div>
      <Text fontSize="xl" fontWeight="semibold">{type}</Text>
      <Foods foodsList={foodList}/>
    </div>
  )
}
