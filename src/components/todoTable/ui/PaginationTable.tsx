import {Flex, Text} from '@chakra-ui/layout';
import {Select} from '@chakra-ui/select';
import {ChangeEvent, ReactElement} from 'react';
import {Pagination} from '@/shared/ui';

type PaginationTable = {
  pageSize: number;
  setPageSize: (size: number) => void;
  pageIndex: number;
  setPageIndex: (idx: number) => void;
  totalItemsCount: number;
  pageSizeOptions: number[];
};

export const PaginationTable = (props: PaginationTable): ReactElement => {
  const {pageSize, setPageSize, pageIndex, setPageIndex, totalItemsCount, pageSizeOptions} = props;

  const totalPages = Math.ceil(totalItemsCount / pageSize);

  const onChangePageSize = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value);
    setPageSize(newSize);
  };
  return (
    <Flex justifyContent={'space-between'}>
      <Flex alignItems={'center'} gap={2}>
        <Text>Items per page:</Text>
        <Select variant={'clear'} value={pageSize} onChange={onChangePageSize} width={'47px'}>
          {pageSizeOptions.map((size, idx) => (
            <option key={idx}>{size}</option>
          ))}
        </Select>
      </Flex>
      <Flex alignItems={'center'} gap={2}>
        <Pagination currentPage={pageIndex} totalPages={totalPages} onPageChange={setPageIndex} />
      </Flex>
    </Flex>
  );
};
