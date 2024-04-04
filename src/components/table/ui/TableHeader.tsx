import {Button, Flex, Stack, Text} from '@chakra-ui/react';
import {ChangeEvent, ReactElement} from 'react';
import {Input} from '@/shared/ui';
type Props = {
  heading: string;
  onResetFilter?: () => void;
  onChangeSearch?: (value: string) => void;
};

export const TableHeader = ({heading, onResetFilter, onChangeSearch}: Props): ReactElement => {
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (onChangeSearch) {
      onChangeSearch(event.target.value);
    }
  };

  return (
    <Stack direction={{base: 'column', md: 'row'}} justify="space-between" mb={5}>
      <Text textStyle="lg" fontWeight="medium">
        {heading}
      </Text>
      <Flex alignItems="baseline" gap={2}>
        <Input debounceTime={300} onChange={onChange} variant="primary" placeholder="Search" />
        {onResetFilter && (
          <Button variant="secondary" onClick={onResetFilter}>
            Reset filters
          </Button>
        )}
      </Flex>
    </Stack>
  );
};
