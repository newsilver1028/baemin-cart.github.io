import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { RootState } from '../Reducers';
import { foodDataReducer } from '../Reducers/foodDataReducer';

import { Text, Box, Checkbox, Flex } from '@chakra-ui/react';

export default function DiscountMenu(props: {name: string, discountName: string, pricesTimesQuantity: number, excludedPrices: number}) {
  const {name, discountName, pricesTimesQuantity, excludedPrices} = props;
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(true);
  const { foodInCart } = useSelector((state: RootState) => state.foodDataReducer);
  const target = foodInCart.foodList.filter((food) => food.name === name);
  const quantity = target.quantity;

  const onSelect = (discountName: string, name: string): void => {
    dispatch(foodDataReducer.actions.selectFoodsForDiscount([discountName, name]));
  }

  function menuCheckboxToggleHandler(event: any) {
    onSelect(discountName, name);
    const checked = event.target.checked;
    if(!checked) {
      setIsChecked(false);
      return;
    }
    setIsChecked(true); 
  }
  
  return (
    <Box key={name} marginY="20px">
      <Flex alignItems="center">
        <Checkbox id={name} isChecked={isChecked} onChange={menuCheckboxToggleHandler}> 
        <Box marginX="15px">
          <Text fontSize="lg" fontWeight="semibold">{name} X {quantity}</Text>
          <Text fontSize="sm" color="red">- ₩{excludedPrices}</Text>
        </Box>
        </Checkbox>
        </Flex>
    </Box>
  )
}
