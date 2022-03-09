import { useSelector } from 'react-redux';

import { Discounts } from '../Interface/discountInterface';
import { RootState } from '../Reducers';
import DiscountsElement from './DiscountsElement';

import { Text } from '@chakra-ui/react'

export default function DiscountsList() {
  const { foodData } = useSelector((store: RootState) => store.cartReducer);
  const discountsList = foodData.discounts;
  const $discountsArray = discountsList.map((discount: Discounts): JSX.Element => {
    const {id, name, discount_rate} = discount;
    return <DiscountsElement key={id} id={id} name={name} discountRate={discount_rate}/>
  });

  return (
    <>
    <Text fontSize="2xl"><b>할인</b></Text>
    <div>{$discountsArray}</div>
    </>
  )
}

