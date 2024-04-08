import {Badge, Box, Flex, IconButton, Stack, Text} from '@chakra-ui/react';
import {ChangeEvent, ReactElement} from 'react';
import {TbFilterOff} from 'react-icons/tb';
import {StatusEnum} from '@/shared/types/task';
import {Counter, Input, Tooltip} from '@/shared/ui';

type Props<T> = {
  heading: string;
  onResetFilter?: () => void;
  onChangeSearch?: (value: string) => void;
  filters?: {
    [key: string]: string;
  };
  items: T[];
};

export const TableHeader = <T extends {status: StatusEnum}>({heading, filters, items, onResetFilter, onChangeSearch}: Props<T>): ReactElement => {
  const filtersEnabled = filters ? Object.keys(filters).length : 0;

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
      <Flex alignItems="center" gap={2}>
        <Counter<T> items={items} />
        <Input withError={false} debounceTime={300} onChange={onChange} variant="primary" placeholder="Search" />
        {onResetFilter && (
          <Tooltip label="Reset filters">
            <Box position="relative">
              {filtersEnabled > 0 && (
                <Badge borderRadius="full" px={2} bg="successColorDark" position="absolute" right={-2} top={-3} zIndex={100}>
                  {filtersEnabled}
                </Badge>
              )}
              <IconButton aria-label="reset-filter" variant="secondary" icon={<TbFilterOff size={15} />} onClick={onResetFilter} />
            </Box>
          </Tooltip>
        )}
      </Flex>
    </Stack>
  );
};
