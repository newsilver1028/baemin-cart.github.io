import CartList from "./CartList";
import DiscountsList from './DiscountsList';

import { Box, IconButton } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useContext } from "react";
import { OpenCartContext } from "./Context/OpenCartContext";

export default function CartBox() {
  const {isOpen, onOpen} = useContext(OpenCartContext);

  return (
    <>
    <Box 
    h="50px" 
    bg="white" 
    borderBottom="gray.200"
    borderBottomWidth="1px">
      <IconButton 
      onClick={onOpen}
      aria-label="back to main page"
      icon={<ArrowBackIcon/>}
      bg="white"
      size="lg"/>
    </Box>
    <CartList />
    <DiscountsList />
    </>
  )
}