import {Button, Stack, Text} from '@chakra-ui/react';
import {ReactElement} from 'react';

type Props = {
  heading: string;
  onResetFilter?: () => void;
};

export const TableHeader = ({heading, onResetFilter}: Props): ReactElement => {
  return (
    <Stack direction={{base: 'column', md: 'row'}} justify="space-between" mb={5}>
      <Text textStyle="lg" fontWeight="medium">
        {heading}
      </Text>
      {onResetFilter && (
        <Button variant="secondary" onClick={onResetFilter}>
          Reset filters
        </Button>
      )}
    </Stack>
  );
};
