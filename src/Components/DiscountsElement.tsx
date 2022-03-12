import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";
import { RootState } from '../Reducers';
import DiscountsMenu from "./DiscountsMenu";

import { Text, Box, Checkbox, Flex, Button } from '@chakra-ui/react';
import { discountReducer } from '../Reducers/discountReducer';

export default function DiscountsElement(props: {id:string, name: string, discountRate: number}) {
  const { discounts } = useSelector((store: RootState) => store.discountReducer);
  const dispatch = useDispatch();
  const {id, name, discountRate} = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const onSelect = (name: string): void => {
    dispatch(discountReducer.actions.SELECT_DISCOUNTS(name));
  }

  const onCompute = () => {
    dispatch(discountReducer.actions.COMPUTE_PRICE());
  }

  function discountCheckboxToggleHandler(event: any): void {
    onSelect(name);
    onCompute();
    const checked = event.target.checked;
    if(!checked) {
      setIsChecked(false);
      return;
    }
    setIsChecked(true); 
  }

  function selectButtonClickHandler(): void {
    if(!isOpen) {
      setIsOpen(true);
      return;
    }
    setIsOpen(false);
  }

  return (
    <Box>
      <Flex justifyContent="space-between" marginY="10px">
        <Flex alignItems="center">
          <Checkbox id={name} isChecked={isChecked} onChange={discountCheckboxToggleHandler}>
          <Box marginX="15px">
            <Text fontSize="lg" fontWeight="semibold">{name}</Text>
            <Text as="sub" fontSize="sm" color="darkgray">{discountRate} %</Text>
          </Box>
          </Checkbox>
        </Flex>
        <Button onClick={selectButtonClickHandler}>메뉴 선택</Button>
      </Flex>
      {isOpen && <DiscountsMenu id={id} name={name}/>}
    </Box>
  )
}