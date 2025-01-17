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
  const tdFontSize = {base: '9px', sm: '9px', md: '9px', lg: '12px', xl: '14px'};

  const onChangePageSize = (event: ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(event.target.value);
    dispatch({type: 'SET_PAGE_SIZE', payload: newSize});
    dispatch({type: 'SET_PAGE_INDEX', payload: 0});
  };

  return (
    <Box>
      <Flex alignItems="baseline" justifyContent="space-between" h="100%">
        <Flex alignItems="center" gap={2}>
          <Text fontSize={tdFontSize}>Items per page:</Text>
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
