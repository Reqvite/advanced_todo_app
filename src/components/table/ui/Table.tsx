import {Flex, Table as ChakraTable, TableContainer, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react';
import {ReactElement, ReactNode, useState} from 'react';
import {FaLongArrowAltDown} from 'react-icons/fa';
import {FaArrowUpLong} from 'react-icons/fa6';
import {SortDirection} from '@/shared/types/sortDirection.ts';
import {BlurBox} from '@/shared/ui';
import {sortData} from '../model/sortData.ts';
import {TableHeader} from './TableHeader.tsx';
import {TablePagination} from './TablePagination.tsx';

interface Props<T> {
  heading: string;
  items: T[];
  renderItem: (item: T) => ReactNode;
  pageSizeOptions?: number[];
}

export const Table = <T,>(props: Props<T>): ReactElement => {
  const {items, renderItem, heading, pageSizeOptions = [10, 20, 50]} = props;
  const keys = Object.keys(items[0] || {}).filter((key) => key !== '_id');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [data, setData] = useState(items);
  const [loading] = useState(false);
  const [sortDirection, setSortDirection] = useState('');
  const [sortField, setSortField] = useState('');
  const onChangeSort = (key: string) => {
    const {sortedData, direction} = sortData(key, data);
    setSortField(key);
    setSortDirection(direction);
    setData(sortedData);
  };

  return (
    <BlurBox>
      <TableHeader heading={heading} />
      <TableContainer w="100%">
        <ChakraTable size="sm">
          <Thead>
            <Tr>
              <Th />
              {keys.map((key, idx) => (
                <Th key={idx}>
                  <Flex cursor="pointer" gap={1} alignItems="center" onClick={() => onChangeSort(key)}>
                    {key}
                    {sortField === key ? sortDirection === SortDirection.Ascending ? <FaArrowUpLong /> : <FaLongArrowAltDown /> : ''}
                  </Flex>
                </Th>
              ))}
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <Tr>
                <Td textAlign="center" colSpan={9}>
                  Loading
                </Td>
              </Tr>
            ) : data.length < 1 || !data ? (
              <Tr>
                <Td textAlign="center" colSpan={9}>
                  Table is empty
                </Td>
              </Tr>
            ) : (
              data.map((item) => renderItem(item)).slice(pageSize * pageIndex, pageSize * (pageIndex + 1))
            )}
          </Tbody>
        </ChakraTable>
        <TablePagination
          pageSize={pageSize}
          setPageSize={setPageSize}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          totalItemsCount={data.length}
          pageSizeOptions={pageSizeOptions}
        />
      </TableContainer>
    </BlurBox>
  );
};
