import {Stack, Text} from '@chakra-ui/react';
import {ReactElement} from 'react';

type Props = {
  heading: string;
};

export const FormHeader = (props: Props): ReactElement => {
  const {heading} = props;

  return (
    <Stack direction={{base: 'column', md: 'row'}} justify="space-between" mb={5}>
      <Text textStyle="lg" fontWeight="medium">
        {heading}
      </Text>
    </Stack>
  );
};
