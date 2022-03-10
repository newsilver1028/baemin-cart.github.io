import CartBox from './CartBox';
import FoodsListBox from './FoodsListBox';

import { Box } from '@chakra-ui/react';
import { Center, Square, Circle } from '@chakra-ui/react'

export default function ContainerBox() {
  return (
    <>
    <Center>
      <Box borderRadius='md'
      w="375px"
      h="667px"
      marginTop="40px"
      overflow="scroll"
      letterSpacing='wide'
      bg="gray.200"
      boxShadow="base">
        <FoodsListBox />
        <CartBox />
      </Box>
    </Center>
    </>
  )
}
