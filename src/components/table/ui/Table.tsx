import {Flex, Table as ChakraTable, TableContainer, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react';
import {ReactElement, useState} from 'react';
import {FaLongArrowAltDown} from 'react-icons/fa';
import {FaArrowUpLong} from 'react-icons/fa6';
import {SortDirection} from '@/shared/types/sortDirection.ts';
import {BlurBox} from '@/shared/ui';
import {sortData} from '../model/sortData.ts';
import {Column} from '../model/types.ts';
import {TableHeader} from './TableHeader.tsx';
import {TablePagination} from './TablePagination.tsx';

interface Props<T> {
  heading: string;
  items: T[];
  pageSizeOptions?: number[];
  columns: Column[];
}

const DEFAULT_PAGINATION = [10, 20, 50];

export const Table = <T extends {_id: string}>({items, heading, pageSizeOptions = DEFAULT_PAGINATION, columns}: Props<T>): ReactElement => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(pageSizeOptions[0]);
  const [data, setData] = useState<T[]>(items);
  const [loading] = useState<boolean>(false);
  const [sortDirection, setSortDirection] = useState<string>('');
  const [sortField, setSortField] = useState<string>('');
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
              {columns.map(({header, accessor}) => (
                <Th key={accessor}>
                  <Flex cursor="pointer" gap={1} alignItems="center" onClick={() => onChangeSort(accessor)}>
                    {header}
                    {sortField === accessor ? sortDirection === SortDirection.Ascending ? <FaArrowUpLong /> : <FaLongArrowAltDown /> : ''}
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
              data.map((row) => (
                <Tr key={row._id}>
                  {columns.map((column) => (
                    <Td key={column.accessor}>
                      {column.cell ? column.cell(row[column.accessor as keyof T], row._id) : row[column.accessor as keyof T]}
                    </Td>
                  ))}
                </Tr>
              ))
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
