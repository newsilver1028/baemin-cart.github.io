import { useDispatch, useSelector } from 'react-redux';
import { ReactElement, useEffect } from "react"

import { RootState } from '../Reducers';
import { cartReducer } from '../Reducers/cartReducer';
import { CartFoodProps } from "../Interface/cartInterface";
import { discountReducer } from '../Reducers/discountReducer';

import { Text, Box, CloseButton, ButtonGroup, Button, IconButton } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

export default function CartFood(props: CartFoodProps): ReactElement {
  const { cartData } = useSelector((store: RootState) => store.cartReducer);
  const storedFoods = cartData.storedFoods;
  const {name, price, quantity } = props;
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

  useEffect(() => {
    dispatch(discountReducer.actions.UPDATE(storedFoods));
    dispatch(discountReducer.actions.COMPUTE_PRICE());
  },[]);

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
