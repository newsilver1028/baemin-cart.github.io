import FoodsListBox from './FoodsListBox';
import CartPageBox from './CartPageBox';
import { OpenCartContext } from './Context/OpenCartContext';

import { Box, Center } from '@chakra-ui/react';
import { useState } from 'react';

export default function ContainerBox() {
  const [isOpen, setIsopen] = useState<boolean>(false);
  const onOpen = (): void => {
    if (!isOpen) {
      setIsopen(true);
      return;
    }
    setIsopen(false);
  };

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
        <OpenCartContext.Provider value={{isOpen, onOpen}}>
        {isOpen ? <CartPageBox /> : <FoodsListBox />}
        </OpenCartContext.Provider>
      </Box>

    </Center>
    </>
  )
}
