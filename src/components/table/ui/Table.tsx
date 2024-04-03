import {Box, Flex, Heading, Table as ChakraTable, TableContainer, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react';
import {isBefore} from 'date-fns';
import {ReactElement, ReactNode} from 'react';
import {FaLongArrowAltDown} from 'react-icons/fa';
import {FaArrowUpLong} from 'react-icons/fa6';
import {TODAYS_DATE} from '@/shared/const/date.ts';
import {SortDirectionEnum} from '@/shared/types/sortDirection.ts';
import {BlurBox} from '@/shared/ui';
import {renderFilterBlock} from '../model/renderFilterBlock.tsx';
import {renderSearchBlock} from '../model/renderSearchBlock.tsx';
import {Column} from '../model/types.ts';
import {useTable} from '../model/useTable.ts';
import {TableHeader} from './TableHeader.tsx';
import {TablePagination} from './TablePagination.tsx';

interface Props<T> {
  heading: string;
  items: T[];
  pageSizeOptions?: number[];
  columns: Column<T>[];
}

const DEFAULT_PAGINATION = [10, 20, 50];

export const Table = <T extends {_id: string; expDate: string}>({
  items,
  heading,
  pageSizeOptions = DEFAULT_PAGINATION,
  columns
}: Props<T>): ReactElement => {
  const {state, onChangeSort, onChangeFilter, onResetFilter, dispatch, filteredData, data, sortField, sortDirection} = useTable<T>({
    items,
    defaultPageSizeOptions: pageSizeOptions
  });
  const {pageIndex, pageSize} = state;
  const isEmptyTable = filteredData.length < 1;

  return (
    <BlurBox minH="760px">
      <TableHeader heading={heading} onResetFilter={onResetFilter} />
      <TableContainer w="100%" height="100%">
        <ChakraTable size="sm">
          <Thead>
            <Tr>
              {columns.map(({header, accessor, filter, search}) => (
                <Th key={accessor}>
                  <Flex>
                    <Flex cursor="pointer" gap={1} alignItems="center">
                      <Box onClick={() => onChangeSort(accessor)}>{header}</Box>
                      <Box w="12px">
                        {sortField === accessor ? sortDirection === SortDirectionEnum.Ascending ? <FaArrowUpLong /> : <FaLongArrowAltDown /> : ''}
                      </Box>
                    </Flex>
                    {filter && renderFilterBlock(filter, accessor, onChangeFilter)}
                    {search && renderSearchBlock(search, accessor, onChangeFilter)}
                  </Flex>
                </Th>
              ))}
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {isEmptyTable || !data ? (
              <Tr>
                <Td textAlign="center" colSpan={9}>
                  <Heading>Table is empty</Heading>
                </Td>
              </Tr>
            ) : (
              filteredData
                .map((row: T) => {
                  const dateIsExpired = isBefore(row?.expDate, TODAYS_DATE);
                  return (
                    <Tr key={row._id} opacity={dateIsExpired ? 0.25 : 1} pointerEvents={dateIsExpired ? 'none' : 'auto'}>
                      {columns.map((column) => (
                        <Td key={column.accessor}>
                          {(column.cell ? column.cell(row[column.accessor as keyof T], row) : row[column.accessor as keyof T]) as ReactNode}
                        </Td>
                      ))}
                    </Tr>
                  );
                })
                .slice(pageSize * pageIndex, pageSize * (pageIndex + 1))
            )}
          </Tbody>
        </ChakraTable>
        {!isEmptyTable && (
          <TablePagination
            pageSize={pageSize}
            dispatch={dispatch}
            pageIndex={pageIndex}
            totalItemsCount={filteredData.length}
            pageSizeOptions={pageSizeOptions}
          />
        )}
      </TableContainer>
    </BlurBox>
  );
};
