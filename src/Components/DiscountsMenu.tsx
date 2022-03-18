import { useSelector } from 'react-redux';

import { RootState } from '../Reducers';
import { Discounts } from '../Interface/discountInterface';

import DiscountMenu from './DiscountMenu';

import { Box } from '@chakra-ui/react';
import { DiscountedFood } from '../Interface/discountInterface';

export default function DiscountsMenu(props: { id: string; discountName: string }) {
  const { discountName } = props;
  const { foodData } = useSelector((store: RootState) => store.foodDataReducer);
  const discounts = foodData.discounts.filter((discount: Discounts) => discount.name === discountName)[0];
  const discountedFood = discounts.discountedFoodList;
  const $discountedList = discountedFood.map((food: DiscountedFood) => {
    const {name, pricesTimesQuantity, excludedPrices } = food;
    return (
      <DiscountMenu key={name} 
      name={name} 
      discountName={discountName} 
      pricesTimesQuantity={pricesTimesQuantity} 
      excludedPrices={excludedPrices} />
    );
  })

  return (
    <Box bg="white">
      {$discountedList}
    </Box>
  )  
}