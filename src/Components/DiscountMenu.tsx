import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { discountReducer } from '../Reducers/discountReducer';

import { Text, Box, Checkbox, Flex } from '@chakra-ui/react';
import { RootState } from '../Reducers';

export default function DiscountMenu(props: {name: string, quantity: number, excludedPrices: number}) {
  const {name, quantity, excludedPrices} = props;
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const { storedFoods } = useSelector((store: RootState) => store.cartReducer)

  const onSelect = (name: string): void => {
    dispatch(discountReducer.actions.SELECT_MENU(name));
  }

  function menuCheckboxToggleHandler(event: any) {
    onSelect(name);
    const checked = event.target.checked;
    if(!checked) {
      setIsChecked(false);
      return;
    }
    setIsChecked(true); 
  }

  useEffect(() => {
    dispatch(discountReducer.actions.COMPUTE_PRICE());
  },[storedFoods])
  
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
