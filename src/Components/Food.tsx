import { ReactElement, useEffect } from "react";
import { FoodProps } from './Foods';

import { useSelector, useDispatch } from 'react-redux';

import { cartReducer } from '../Reducers/cartReducer';
import { RootState } from '../Reducers';
import { Items, StoredFoods } from '../Interface/cartInterface';
import { discountReducer } from '../Reducers/discountReducer';

import { Text } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import AlertDialogOverlapped from "./ui/AlertDialogOverlapped";

export default function Food(props: FoodProps): ReactElement {
  const {name, price} = props;
  const dispatch = useDispatch();
  const { cartData } = useSelector((store: RootState) => store.cartReducer);
  const storedFoods = cartData.storedFoods;

  const onAdd = (target: string) => {
    dispatch(cartReducer.actions.ADD(target));
    dispatch(cartReducer.actions.UPDATE());
  } 

  const onUpdate = (storedFoods: StoredFoods[]) => {
    dispatch(discountReducer.actions.ADD(storedFoods));
    dispatch(discountReducer.actions.UPDATE(storedFoods));
  }

  function addCartClickHandler(): any {
    const isOverlapped = storedFoods.filter((item: Items) => item.name === name).length !== 0;
    if (isOverlapped) {
      // alert("이미 장바구니에 등록된 상품입니다.");
      <AlertDialogOverlapped name={name} isOverlapped={isOverlapped}/>
      return;
    }
    onAdd(name);
  }

  useEffect(() => {
    onUpdate(storedFoods);
  },[storedFoods]);
  
  return (
    <Box marginY="20px">
      <Text id={name} fontSize="lg" fontWeight="semibold" onClick={addCartClickHandler}>{name}</Text>
      <Text id={name+"price"} fontSize="sm" color="darkgray">₩{price}</Text>
    </Box>
  )
}
