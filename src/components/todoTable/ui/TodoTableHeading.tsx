import {Icon, Input, InputGroup, InputLeftElement, Stack, Text} from '@chakra-ui/react';
import {FaSearch} from 'react-icons/fa';

export const TodoTableHeading = () => {
  return (
    <Stack direction={{base: 'column', md: 'row'}} justify="space-between" mb={5}>
      <Text textStyle="lg" fontWeight="medium">
        Todos
      </Text>
      <InputGroup maxW="xs">
        <InputLeftElement pointerEvents="none">
          <Icon color="accentColor" as={FaSearch} boxSize="5" />
        </InputLeftElement>
        <Input placeholder="Search" />
      </InputGroup>
    </Stack>
  );
};
