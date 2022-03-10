import { extendTheme, ChakraProvider } from '@chakra-ui/react';
import ContainerBox from './Components/ContainerBox';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

function App() {
  return (
    <ChakraProvider theme={theme}>
    <div className="App">
      <ContainerBox />
    </div>
    </ChakraProvider>
  );
}

export default App;
