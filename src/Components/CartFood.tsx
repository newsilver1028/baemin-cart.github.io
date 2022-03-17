import { useDispatch, useSelector } from 'react-redux';
import { ReactElement, useEffect } from "react"

import { RootState } from '../Reducers';
import { CartFoodProps } from "../Interface/cartInterface";

import { Text, Box, CloseButton, ButtonGroup, Button, IconButton } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { foodDataReducer } from '../Reducers/foodDataReducer';

export default function CartFood(props: CartFoodProps): ReactElement {
  const { foodInCart } = useSelector((store: RootState) => store.foodDataReducer);
  const foodList = foodInCart.foodList;
  const {name, price, quantity } = props;
  const dispatch = useDispatch();

  const onIncrease = (target: string): void => {
    dispatch(foodDataReducer.actions.increaseFoodQuantity(target));
  } 

  const onDecrease = (target: string): void => {
    dispatch(foodDataReducer.actions.decreaseFoodQuantity(target));
  }

  const onDelete = (target: string): void => {
    dispatch(foodDataReducer.actions.deleteFoodInCart(target));
  }

  // useEffect(() => {
  //   dispatch(foodDataReducer.actions.updateTotalPrice());
  // },[foodList]);


  return (
  <Box marginY="20px" display="flex" justifyContent="space-between" w="100%">
    <Box w="70%">
      <Text id={name} fontSize="lg" fontWeight="semibold">{name}</Text>
      <Text id={name+"price"} as="sub" fontSize="md" color="darkgray">₩{price}</Text>
    </Box>
    <Box display="flex" w="30%" flexDirection="column">
      <CloseButton color="lightgrey" onClick={() => onDelete(name)} alignSelf="end" mr="10px"/>
      <Box>
        <ButtonGroup variant='outline' size="sm" spacing="0">
          <IconButton 
          width="30px"
          aria-label='decrease quantity'
          size="small" 
          icon={<MinusIcon/>}  
          borderRightRadius="0"
          onClick={() => onDecrease(name)} />
          <Button borderRadius="0" cursor="default" borderX="0">{quantity}</Button>
          <IconButton 
          width="30px"
          aria-label='increase quantity'
          size="small" 
          icon={<AddIcon/>}
          borderLeftRadius="0"
          onClick={() => onIncrease(name)}/>
        </ButtonGroup>
      </Box>
    </Box>
  </Box>
  )
}
