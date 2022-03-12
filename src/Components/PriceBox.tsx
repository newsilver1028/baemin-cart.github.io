import { useSelector } from 'react-redux';

import { RootState } from '../Reducers';

import { Text, Flex, Box } from '@chakra-ui/react';

export default function PriceBox() {
  const { totalPrices } = useSelector((store: RootState) => store.discountReducer);

  return (
    <Box bg="white" padding="10px">
    <Flex justifyContent="space-between" marginX="10px">
      <Text fontSize="xl" fontWeight="semibold">총 주문금액</Text>
      <Text>₩ {totalPrices}</Text>
    </Flex>
    </Box>
  )

}