import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Discounts } from '../Interface/discountInterface';
import { RootState } from '../Reducers';
import { discountReducer } from '../Reducers/discountReducer';
import DiscountsElement from './DiscountsElement';

import { Text, Box } from '@chakra-ui/react'

export default function DiscountsList() {
  const dispatch = useDispatch();
  const { foodData } = useSelector((store: RootState) => store.cartReducer);
  const discountsList = foodData.discounts;
  const $discountsArray = discountsList.map((discount: Discounts): JSX.Element => {
    const {id, name, discount_rate} = discount;
    return <DiscountsElement key={id} id={id} name={name} discountRate={discount_rate}/>
  });

  return (
    <Box padding="10px" marginY="20px" bg="white">
      <Text fontSize="2xl" fontWeight="semibold">할인</Text>
      <Box display="flex" flexDirection="column" marginY="20px">{$discountsArray}</Box>
    </Box>
  )
}

