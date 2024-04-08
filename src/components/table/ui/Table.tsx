import {Box, Flex, Heading, Table as ChakraTable, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from '@chakra-ui/react';
import {isBefore} from 'date-fns';
import {ReactElement, ReactNode} from 'react';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import {TODAYS_DATE} from '@/shared/const/date.ts';
import {SortDirectionEnum} from '@/shared/types/sortDirection.ts';
import {BlurBox} from '@/shared/ui';
import {renderFilterBlock} from '../model/renderFilterBlock.tsx';
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
  const {state, onChangeSort, onChangeSearch, onChangeFilter, onResetFilter, dispatch, filteredRows, rows, sortField, sortDirection} = useTable<T>({
    items,
    defaultPageSizeOptions: pageSizeOptions
  });
  const {pageIndex, pageSize} = state;
  const isEmptyTable = filteredRows.length < 1;

  return (
    <BlurBox minH="670px" mb={50}>
      <TableHeader heading={heading} onResetFilter={onResetFilter} onChangeSearch={onChangeSearch} />
      <TableContainer w="100%" height="100%">
        <ChakraTable size="sm" variant="unstyled">
          <Thead borderBottom="1px #2D3748 solid">
            <Tr>
              {columns.map(({header, accessor, filter}) => (
                <Th key={accessor}>
                  <Flex gap={1}>
                    <Flex cursor="pointer" gap={1} alignItems="center">
                      <Text textTransform="none" onClick={() => onChangeSort(accessor)}>
                        {header}
                      </Text>
                      <Box w="12px">
                        {sortField === accessor ? sortDirection === SortDirectionEnum.Ascending ? <IoIosArrowUp /> : <IoIosArrowDown /> : ''}
                      </Box>
                    </Flex>
                    {filter && renderFilterBlock(filter, accessor, onChangeFilter)}
                  </Flex>
                </Th>
              ))}
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {isEmptyTable || !rows ? (
              <Tr>
                <Td h="580px" textAlign="center" colSpan={9}>
                  <Heading>Table is empty</Heading>
                </Td>
              </Tr>
            ) : (
              filteredRows.slice(pageSize * pageIndex, pageSize * (pageIndex + 1)).map((row: T) => {
                const dateIsExpired = isBefore(row?.expDate, TODAYS_DATE);
                return (
                  <Tr
                    key={row._id}
                    opacity={dateIsExpired ? 0.25 : 1}
                    pointerEvents={dateIsExpired ? 'none' : 'auto'}
                    borderBottom="1px #2D3748 solid"
                  >
                    {columns.map((column) => (
                      <Td padding="5px" key={column.accessor}>
                        {(column.cell ? column.cell(row[column.accessor as keyof T], row) : row[column.accessor as keyof T]) as ReactNode}
                      </Td>
                    ))}
                  </Tr>
                );
              })
            )}
          </Tbody>
        </ChakraTable>
        {!isEmptyTable && (
          <TablePagination
            pageSize={pageSize}
            dispatch={dispatch}
            pageIndex={pageIndex}
            totalItemsCount={filteredRows.length}
            pageSizeOptions={pageSizeOptions}
          />
        )}
      </TableContainer>
    </BlurBox>
  );
};
