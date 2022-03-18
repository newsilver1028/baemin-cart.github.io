import { useDispatch } from 'react-redux';
import { useState } from "react";
import DiscountsMenu from "./DiscountsMenu";

import { Text, Box, Checkbox, Flex, Button, useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/react';
import { Discounts } from '../Interface/cartInterface';
import { foodDataReducer } from '../Reducers/foodDataReducer';

export default function DiscountsElement(props: Discounts) {
  const {id, name, discount_rate} = props;
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(true);
  const {isOpen, onOpen, onClose} = useDisclosure();

  const onSelect = (name: string): void => {
    dispatch(foodDataReducer.actions.selectDiscounts(name));
  }

  function discountCheckboxToggleHandler(event: any): void {
    onSelect(name);
    const checked = event.target.checked;
    if(!checked) {
      setIsChecked(false);
      return;
    }
    setIsChecked(true); 
  }

  return (
    <Box>
      <Flex justifyContent="space-between" marginY="10px">
        <Flex alignItems="center">
          <Checkbox id={name} isChecked={isChecked} onChange={discountCheckboxToggleHandler}>
          <Box marginX="15px">
            <Text fontSize="lg" fontWeight="semibold">{name}</Text>
            <Text as="sub" fontSize="sm" color="darkgray">{discount_rate} %</Text>
          </Box>
          </Checkbox>
        </Flex>
        <Button onClick={onOpen}>메뉴 선택</Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="367px" h="400px">
          <ModalHeader>{name}</ModalHeader>
          <ModalBody>
            <ModalCloseButton />
            <DiscountsMenu id={id} discountName={name}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}