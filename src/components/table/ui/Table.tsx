import {Box, Flex, Table as ChakraTable, TableContainer, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react';
import {ChangeEvent, ReactElement, ReactNode, useEffect, useReducer} from 'react';
import {FaLongArrowAltDown} from 'react-icons/fa';
import {FaArrowUpLong} from 'react-icons/fa6';
import {SortDirectionEnum} from '@/shared/types/sortDirection.ts';
import {BlurBox, DatePicker, PopoverSelect} from '@/shared/ui';
import {applyFilters} from '../model/applyFilters.ts';
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
  columns: Column<T>[];
  isLoading?: boolean;
}

const DEFAULT_PAGINATION = [10, 20, 50];

export const Table = <T extends {_id: string}>({
  items,
  heading,
  pageSizeOptions = DEFAULT_PAGINATION,
  isLoading,
  columns
}: Props<T>): ReactElement => {
  const [state, dispatch] = useReducer(tableReducer, {...initialState, data: items});
  const {pageIndex, pageSize, data = items, sortDirection, sortField, filters} = state;

  const onChangeSort = (key: string) => {
    const {sortedData, direction} = sortData(key, data);
    dispatch({type: 'SET_SORT_FIELD', payload: key});
    dispatch({type: 'SET_SORT_DIRECTION', payload: direction});
    dispatch({type: 'SET_DATA', payload: sortedData});
  };

  const onChangeFilter = (key: string, e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({type: 'SET_FILTER', payload: {key, value: e?.target?.value ? e.target.value : e}});
    dispatch({type: 'SET_PAGE_INDEX', payload: 0});
  };

  useEffect(() => {
    dispatch({type: 'SET_DATA', payload: items});
  }, [items, dispatch]);

  const filteredData = applyFilters(data, filters);

  return (
    <BlurBox>
      <TableHeader heading={heading} />
      <TableContainer w="100%">
        <ChakraTable size="sm">
          <Thead>
            <Tr>
              {columns.map(({header, accessor, filter, datePicker}) => (
                <Th key={accessor}>
                  <Flex>
                    <Flex cursor="pointer" gap={1} alignItems="center" onClick={() => onChangeSort(accessor)}>
                      {header}
                      <Box w="12px">
                        {sortField === accessor ? sortDirection === SortDirectionEnum.Ascending ? <FaArrowUpLong /> : <FaLongArrowAltDown /> : ''}
                      </Box>
                    </Flex>
                    {filter && <PopoverSelect options={filter} onChange={(value) => onChangeFilter(accessor, value)} />}
                  </Flex>
                  {datePicker && <DatePicker isRangePicker onDateSelect={(value) => onChangeFilter(accessor, value)} />}
                </Th>
              ))}
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {isLoading ? (
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
              filteredData
                .map((row: T) => (
                  <Tr key={row._id}>
                    {columns.map((column) => (
                      <Td key={column.accessor}>
                        {(column.cell ? column.cell(row[column.accessor as keyof T], row) : row[column.accessor as keyof T]) as ReactNode}
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
          totalItemsCount={filteredData.length}
          pageSizeOptions={pageSizeOptions}
        />
      </TableContainer>
    </BlurBox>
  );
};
