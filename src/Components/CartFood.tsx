import { useDispatch } from 'react-redux';
import { ReactElement } from "react"

import { cartReducer } from '../Reducers/cartReducer';
import { CartFoodProps } from "./CartList"

import { Text, Box, CloseButton } from '@chakra-ui/react';

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
  <Box marginY="20px" display="flex" justifyContent="space-between" w="100%">
    <Box w="80%">
      <Text id={name} fontSize="lg" fontWeight="semibold">{name}</Text>
      <Text id={name+"price"} as="sub" fontSize="md" color="darkgray">₩{price}</Text>
    </Box>
    <Box display="flex" w="10%" flexDirection="column">
      <CloseButton color="lightgrey" onClick={() => onDelete(name)}/>
      <Box>
        <button type="button" onClick={() => onDecrease(name)}>-</button>
        <span>{quantitiy}</span>
        <button type="button" onClick={() => onIncrease(name)}>+</button>
      </Box>
    </Box>
  </Box>
  )
}