import { useDispatch } from 'react-redux';
import { useState } from "react";
import DiscountsMenu from "./DiscountsMenu";
import { discountReducer } from '../Reducers/discountReducer';

import { Text, Box, Checkbox, Flex, Button, useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from '@chakra-ui/react';

export default function DiscountsElement(props: {id:string, name: string, discountRate: number}) {
  const dispatch = useDispatch();
  const {id, name, discountRate} = props;
  const [isChecked, setIsChecked] = useState(false);
  const {isOpen, onOpen, onClose} = useDisclosure();

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
        <Button onClick={onOpen}>메뉴 선택</Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="367px" h="400px">
          <Box bg="white" borderRadius="10px" p="10px">
            <ModalCloseButton />
            <DiscountsMenu id={id} name={name}/>
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  )
}