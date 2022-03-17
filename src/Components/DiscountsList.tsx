import { useSelector } from 'react-redux';
import { Discounts } from '../Interface/cartInterface';
import { RootState } from '../Reducers';
import DiscountsElement from './DiscountsElement';

import { Text, Box } from '@chakra-ui/react'

export default function DiscountsList() {
  const { foodData } = useSelector((store: RootState) => store.foodDataReducer);
  const discountsList = foodData.discounts;
  const $discountsArray = discountsList.map((discount: Discounts): JSX.Element => {
    const {id, name, discount_rate} = discount;
    return <DiscountsElement key={id} id={id} name={name} discount_rate={discount_rate}/>
  });

  return (
    <Box padding="10px" marginY="20px" bg="white">
      <Text fontSize="2xl" fontWeight="semibold">할인</Text>
      <Box display="flex" flexDirection="column" marginY="20px">{$discountsArray}</Box>
    </Box>
  )
}

