import {Flex, Table as ChakraTable, TableContainer, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react';
import {ReactElement, ReactNode, useReducer} from 'react';
import {FaLongArrowAltDown} from 'react-icons/fa';
import {FaArrowUpLong} from 'react-icons/fa6';
import {SortDirection} from '@/shared/types/sortDirection.ts';
import {BlurBox} from '@/shared/ui';
import {sortData} from '../model/sortData.ts';
import {tableReducer} from '../model/tableReducer.ts';
import {initialState} from '../model/tableReducer.ts';
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
  const [state, dispatch] = useReducer(tableReducer, {...initialState, data: items});
  const {pageIndex, pageSize, data = items, loading, sortDirection, sortField} = state;

  const onChangeSort = (key: string) => {
    const {sortedData, direction} = sortData(key, data);
    dispatch({type: 'SET_SORT_FIELD', payload: key});
    dispatch({type: 'SET_SORT_DIRECTION', payload: direction});
    dispatch({type: 'SET_DATA', payload: sortedData});
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
              data
                .map((row: T) => (
                  <Tr key={row._id}>
                    {columns.map((column) => (
                      <Td key={column.accessor}>
                        {(column.cell ? column.cell(row[column.accessor as keyof T], row._id) : row[column.accessor as keyof T]) as ReactNode}
                      </Td>
                    ))}
                  </Tr>
                ))
                .slice(pageSize * pageIndex, pageSize * (pageIndex + 1))
            )}
          </Tbody>
        </ChakraTable>
        <TablePagination
          pageSize={pageSize}
          setPageSize={dispatch}
          pageIndex={pageIndex}
          setPageIndex={dispatch}
          totalItemsCount={data.length}
          pageSizeOptions={pageSizeOptions}
        />
      </TableContainer>
    </BlurBox>
  );
};
