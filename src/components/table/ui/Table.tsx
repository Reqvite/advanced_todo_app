import {Box, Flex, Heading, Table as ChakraTable, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from '@chakra-ui/react';
import {isBefore} from 'date-fns';
import {ReactElement, ReactNode} from 'react';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import {TODAYS_DATE} from '@/shared/const/date.ts';
import {SortDirectionEnum} from '@/shared/types/sortDirection.ts';
import {BlurBox, Tooltip} from '@/shared/ui';
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
  maxRowLength?: number;
}

const DEFAULT_PAGINATION = [10, 20, 50];
const MAX_ROW_LENGTH = 50;

export const Table = <T extends {_id: string; expDate: string}>({
  items,
  heading,
  pageSizeOptions = DEFAULT_PAGINATION,
  columns,
  maxRowLength = MAX_ROW_LENGTH
}: Props<T>): ReactElement => {
  const {state, onChangeSort, onChangeSearch, onChangeFilter, onResetFilter, dispatch, filteredRows, rows, sortField, sortDirection} = useTable<T>({
    items,
    defaultPageSizeOptions: pageSizeOptions
  });
  const {pageIndex, pageSize} = state;
  const isEmptyTable = filteredRows.length < 1;

  const renderCell = (columns: Column<T>[], row: T, dateIsExpired: boolean) => {
    return columns.map((column) => {
      const value = row[column.accessor as keyof T];
      const length = JSON.stringify(value)?.length;
      if (length > maxRowLength && typeof value === 'string') {
        const truncatedValue = `${value.slice(0, maxRowLength)}...`;

        return (
          <Td padding="5px" key={`${row._id}-${column.accessor}`} opacity={column.accessor !== 'actions' && dateIsExpired ? 0.3 : 1}>
            <Tooltip label={value} aria-label="Full text">
              {truncatedValue}
            </Tooltip>
          </Td>
        );
      }

      return (
        <Td padding="5px" key={`${row._id}-${column.accessor}`} opacity={column.accessor !== 'actions' && dateIsExpired ? 0.3 : 1}>
          {(column.cell ? column.cell(row[column.accessor as keyof T], row) : row[column.accessor as keyof T]) as ReactNode}
        </Td>
      );
    });
  };

  return (
    <BlurBox minH="670px" mb={50}>
      <TableHeader heading={heading} onResetFilter={onResetFilter} onChangeSearch={onChangeSearch} />
      <TableContainer w="100%" height="100%">
        <ChakraTable size="sm" variant="unstyled">
          <Thead borderBottom="borderSecondary">
            <Tr>
              {columns.map(({header, accessor, filter}) => (
                <Th key={accessor}>
                  <Flex gap={1}>
                    <Flex cursor="pointer" gap={1} alignItems="center">
                      {accessor === 'actions' ? (
                        <Text as="button" textTransform="none">
                          {header}
                        </Text>
                      ) : (
                        <Text as="button" textTransform="none" onClick={() => onChangeSort(accessor)}>
                          {header}
                        </Text>
                      )}
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
                <Td h="450px" textAlign="center" colSpan={9}>
                  <Heading>Table is empty</Heading>
                </Td>
              </Tr>
            ) : (
              filteredRows.slice(pageSize * pageIndex, pageSize * (pageIndex + 1)).map((row: T) => {
                const dateIsExpired = isBefore(row?.expDate, TODAYS_DATE);
                return (
                  <Tr key={row._id} borderBottom="borderSecondary">
                    {renderCell(columns, row, dateIsExpired)}
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
