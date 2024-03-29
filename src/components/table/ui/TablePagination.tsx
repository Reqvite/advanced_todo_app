import {Flex, Text} from '@chakra-ui/layout';
import {Select} from '@chakra-ui/select';
import {ChangeEvent, ReactElement, SetStateAction} from 'react';
import {Paginator} from '@/shared/ui';

type Props = {
  pageSize: number;
  setPageSize: (size: number) => void;
  pageIndex: number;
  setPageIndex: (callback: SetStateAction<number>) => void;
  totalItemsCount: number;
  pageSizeOptions: number[];
};

export const TablePagination = ({pageSize, setPageSize, pageIndex, setPageIndex, totalItemsCount, pageSizeOptions}: Props): ReactElement => {
  const totalPages = Math.ceil(totalItemsCount / pageSize);
  const onChangePageSize = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value);
    setPageSize(newSize);
  };

  return (
    <Flex justifyContent="space-between">
      <Flex alignItems="center" gap={2}>
        <Text>Items per page:</Text>
        <Select variant="clear" value={pageSize} onChange={onChangePageSize} width="47px">
          {pageSizeOptions.map((size, idx) => (
            <option key={idx}>{size}</option>
          ))}
        </Select>
      </Flex>
      <Flex alignItems="center" gap={2}>
        <Paginator currentPage={pageIndex} totalPages={totalPages} onPageChange={setPageIndex} />
      </Flex>
    </Flex>
  );
};
