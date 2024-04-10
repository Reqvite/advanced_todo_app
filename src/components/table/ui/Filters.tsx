import {Box, Button, Flex, SimpleGrid, useDisclosure, useMediaQuery} from '@chakra-ui/react';
import {Fragment} from 'react/jsx-runtime';
import {MEDIA_QUERY} from '@/shared/const';
import {LabelOptionsI} from '@/shared/types/options';
import {Drawer} from '@/shared/ui';
import {Column} from '..';
import {renderFilterBlock} from '../model/renderFilterBlock';

interface Props<T> {
  columns: Column<T>[];
  onChangeFilter: (key: string, value: string | LabelOptionsI[], type: string) => void;
  values: {[key: string]: string};
}

export const Filters = <T,>({onChangeFilter, columns, values}: Props<T>) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [isLargerThan900] = useMediaQuery(MEDIA_QUERY.MIN_WIDTH_TABLET, {
    ssr: false
  });

  if (isLargerThan900) {
    return (
      <SimpleGrid columns={2} spacing={3}>
        {columns.map(({accessor, filter}) => (
          <Fragment key={accessor}>{filter && renderFilterBlock(filter, accessor, onChangeFilter, values[accessor])}</Fragment>
        ))}
      </SimpleGrid>
    );
  }

  return (
    <>
      <Button variant="primary" onClick={onOpen}>
        Filters
      </Button>
      <Drawer onClose={onClose} isOpen={isOpen} title="Filters">
        <Flex gap={5} justifyContent="flex-end" alignItems="center" flexDirection="column">
          {columns.map(({accessor, filter}) => (
            <>
              {filter && (
                <Box w="100%" key={accessor}>
                  {renderFilterBlock(filter, accessor, onChangeFilter, values[accessor])}
                </Box>
              )}
            </>
          ))}
        </Flex>
      </Drawer>
    </>
  );
};
