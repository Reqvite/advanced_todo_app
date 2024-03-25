import {Box, Heading} from '@chakra-ui/layout';
import {Button} from '@chakra-ui/react';
import {useState} from 'react';

const MainPage = () => {
  const [count, setCount] = useState(0);

  return (
    <Box>
      <Heading>Main page</Heading>
      <div></div>
      <h1>Vite + React</h1>
      <div>
        <Button variant="primary" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p>Click on the Vite and React logos to learn more</p>
    </Box>
  );
};

export default MainPage;
