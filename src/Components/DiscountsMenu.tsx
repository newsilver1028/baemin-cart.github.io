import { useSelector } from 'react-redux'

import { RootState } from '../Reducers';
import { Discounts } from '../Interface/discountInterface';

import { Text } from '@chakra-ui/react';

export default function DiscountsMenu(props: { id: string; name: string }) {
  const { discounts } = useSelector((store: RootState) => store.discountReducer);
  const {id, name} = props;
  const discountsArray = discounts.filter((discount: Discounts) => discount.name === name)[0];
  const discountedMenu = discountsArray.discountedMenu;
  const $discountedList = discountedMenu.map((el: any) => {
    const {name, _, excludedPrice } = el;
    return (
    <div key={id+name}>
      <Text fontSize="lg" fontWeight="semibold">{name}</Text>
      <Text as="sub" fontSize="sm" color="red">- ₩{excludedPrice}</Text>
    </div>);
  })

  return (
    <div>{$discountedList}</div>
  )  
}