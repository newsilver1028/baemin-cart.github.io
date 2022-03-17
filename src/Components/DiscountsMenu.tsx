import { useSelector } from 'react-redux';

import { RootState } from '../Reducers';
import { Discounts } from '../Interface/discountInterface';

import DiscountMenu from './DiscountMenu';

import { Box } from '@chakra-ui/react';
import { DiscountedFoodList } from '../Interface/cartInterface';

export default function DiscountsMenu(props: { id: string; name: string }) {
  const { name } = props;
  const { foodData } = useSelector((store: RootState) => store.foodDataReducer);
  const discounts = foodData.discounts.filter((discount: Discounts) => discount.name === name)[0];
  const discountedFood = discounts.discountedFood;
  const $discountedList = discountedFood.map((food: DiscountedFoodList) => {
    const {name, priceTimesQuantity, excludedPrices } = food;
    return (
      <DiscountMenu key={name} name={name} priceTimesQuantity={priceTimesQuantity} excludedPrices={excludedPrices} />
    );
  })

  return (
    <Box bg="white">
      {$discountedList}
    </Box>
  )  
}