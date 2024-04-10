import {Box, Button, Flex, SimpleGrid, useColorModeValue, useDisclosure, useMediaQuery} from '@chakra-ui/react';
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
  const boxBg = useColorModeValue('secondaryBgColorLightTransparent', 'secondaryBgColorDarkTransparent');

  if (isLargerThan900) {
    return (
      <Box borderRadius="lg" bg={boxBg} p={5}>
        <SimpleGrid columns={2} spacing={3}>
          {columns.map(({accessor, filter}) => (
            <Fragment key={accessor}>{filter && renderFilterBlock(filter, accessor, onChangeFilter, values[accessor])}</Fragment>
          ))}
        </SimpleGrid>
      </Box>
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
            <Fragment key={accessor}>
              {filter && <Box w="100%">{renderFilterBlock(filter, accessor, onChangeFilter, values[accessor])}</Box>}
            </Fragment>
          ))}
        </Flex>
      </Drawer>
    </>
  );
};
