import {Box, Flex, Text} from '@chakra-ui/layout';
import {Select} from '@chakra-ui/select';
import {ChangeEvent, Dispatch, ReactElement} from 'react';
import {ActionI} from '@/shared/types/reducerAction';
import {Paginator} from '@/shared/ui';

type Props = {
  pageSize: number;
  dispatch: Dispatch<ActionI<number>>;
  pageIndex: number;
  totalItemsCount: number;
  pageSizeOptions: number[];
};

export const TablePagination = ({pageSize, pageIndex, dispatch, totalItemsCount, pageSizeOptions}: Props): ReactElement => {
  const totalPages = Math.ceil(totalItemsCount / pageSize);

  const onChangePageSize = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value);
    dispatch({type: 'SET_PAGE_SIZE', payload: newSize});
    dispatch({type: 'SET_PAGE_INDEX', payload: 0});
  };

  return (
    <Box>
      <Flex justifyContent="space-between" h="100%">
        <Flex alignItems="center" gap={2}>
          <Text>Items per page:</Text>
          <Select variant="clear" value={pageSize} onChange={onChangePageSize} width="47px">
            {pageSizeOptions.map((size) => (
              <option key={size}>{size}</option>
            ))}
          </Select>
        </Flex>
        <Flex alignItems="center" gap={2}>
          <Paginator currentPage={pageIndex} totalPages={totalPages} dispatch={dispatch} />
        </Flex>
      </Flex>
    </Box>
  );
};
