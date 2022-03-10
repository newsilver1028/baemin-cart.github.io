import Foods from './Foods';
import { FoodsTypeProps } from '../Interface/foodDataInterface';

import { Text } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

export default function FoodsType(props: FoodsTypeProps ) {
  const {type, foodList} = props;

  return(
    <Box
    marginY="20px"
    padding="10px" 
    bg="white">
      <Box marginY="10px">
        <Text fontSize="2xl" fontWeight="semibold">{type}</Text>
      </Box>
      <Box marginY="20px">
        <Foods foodsList={foodList}/>
      </Box>
    </Box>
  )
}
