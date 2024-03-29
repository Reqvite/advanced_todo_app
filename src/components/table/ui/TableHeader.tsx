import {Icon, Input, InputGroup, InputLeftElement, Stack, Text} from '@chakra-ui/react';
import {ReactElement} from 'react';
import {FaSearch} from 'react-icons/fa';

type Props = {
  heading: string;
};

export const TableHeader = ({heading}: Props): ReactElement => {
  return (
    <Stack direction={{base: 'column', md: 'row'}} justify="space-between" mb={5}>
      <Text textStyle="lg" fontWeight="medium">
        {heading}
      </Text>
      <InputGroup maxW="xs">
        <InputLeftElement pointerEvents="none">
          <Icon color="accentColor" as={FaSearch} boxSize="5" />
        </InputLeftElement>
        <Input variant="primary" placeholder="Search" />
      </InputGroup>
    </Stack>
  );
};
