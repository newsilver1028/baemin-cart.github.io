import { ReactElement, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../Reducers';
import { Items } from '../Interface/cartInterface';
import { FoodProps } from './Foods';

import { Text } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { foodDataReducer } from "../Reducers/foodDataReducer";

export default function Food(props: FoodProps): ReactElement {
  const {name, price} = props;
  const dispatch = useDispatch();
  const { foodInCart } = useSelector((store: RootState) => store.foodDataReducer);
  const foodList = foodInCart.foodList;

  const onAdd = (target: string) => {
    dispatch(foodDataReducer.actions.addFoodInCart(target));
  } 

  function addCartClickHandler(): any {
    const isOverlapped = foodList.filter((item: Items) => item.name === name).length !== 0;
    if (isOverlapped) {
      alert("이미 장바구니에 등록된 상품입니다.");
      return;
    }
    onAdd(name);
  }

  // const onUpdate = () => {
  //   dispatch(foodDataReducer.actions.updateTotalPrice());
  // }

  // useEffect(() => {
  //   onUpdate();
  // },[foodList]);
  
  return (
    <Box marginY="20px" cursor="pointer">
      <Text id={name} fontSize="lg" fontWeight="semibold" onClick={addCartClickHandler}>{name}</Text>
      <Text id={name+"price"} fontSize="sm" color="darkgray">₩{price}</Text>
    </Box>
  )
}
