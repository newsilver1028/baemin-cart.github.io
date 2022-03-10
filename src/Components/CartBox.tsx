import CartList from "./CartList";
import DiscountsList from './DiscountsList';

import { Box } from '@chakra-ui/react';

export default function CartBox() {
  return (
    <>
    <Box 
    h="50px" 
    bg="white" 
    borderBottom="gray.200"
    borderBottomWidth="1px">
      back icon
    </Box>
    <CartList />
    <DiscountsList />
    </>
  )
}