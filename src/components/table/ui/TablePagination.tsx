import {Flex, Text} from '@chakra-ui/layout';
import {Select} from '@chakra-ui/select';
import {ChangeEvent, ReactElement} from 'react';
import {ActionI} from '@/shared/types/reducerAction';
import {Paginator} from '@/shared/ui';

type Props = {
  pageSize: number;
  setPageSize: ({type}: ActionI) => void;
  pageIndex: number;
  setPageIndex: ({type}: ActionI) => void;
  totalItemsCount: number;
  pageSizeOptions: number[];
};

export const TablePagination = ({pageSize, setPageSize, pageIndex, setPageIndex, totalItemsCount, pageSizeOptions}: Props): ReactElement => {
  const totalPages = Math.ceil(totalItemsCount / pageSize);
  const onChangePageSize = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value);
    setPageSize({type: 'SET_PAGE_SIZE', payload: newSize});
    setPageIndex({type: 'SET_PAGE_INDEX', payload: 0});
  };

  return (
    <Flex justifyContent="space-between">
      <Flex alignItems="center" gap={2}>
        <Text>Items per page:</Text>
        <Select variant="clear" value={pageSize} onChange={onChangePageSize} width="47px">
          {pageSizeOptions.map((size) => (
            <option key={size}>{size}</option>
          ))}
        </Select>
      </Flex>
      <Flex alignItems="center" gap={2}>
        <Paginator currentPage={pageIndex} totalPages={totalPages} onPageChange={setPageIndex} />
      </Flex>
    </Flex>
  );
};
