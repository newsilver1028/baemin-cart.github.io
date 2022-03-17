import { useSelector } from 'react-redux';
import { useState } from 'react';

import { RootState } from '../Reducers';
import FoodsListBox from './FoodsListBox';
import CartPageBox from './CartPageBox';
import { OpenCartContext } from './Context/OpenCartContext';

import { Box, Center, Button } from '@chakra-ui/react';

export default function ContainerBox() {
  const { isLoading } = useSelector((store: RootState) => store.foodDataReducer);
  const [isOpen, setIsopen] = useState<boolean>(false);
  const onOpen = (): void => {
    if (!isOpen) {
      setIsopen(true);
      return;
    }
    setIsopen(false);
  };

  return (
  <Center>
    <Box borderRadius='md'
    w="375px"
    h="667px"
    marginTop="40px"
    overflow="scroll"
    letterSpacing='wide'
    bg="gray.200"
    boxShadow="base">
      {isLoading && <Center w="375px" h="667px">
        <Button isLoading>Loading...</Button>
      </Center>}
      <OpenCartContext.Provider value={{isOpen, onOpen}}>
      {isOpen ? <CartPageBox /> : <FoodsListBox />}
      </OpenCartContext.Provider>
    </Box>
  </Center>
  )
}
