import {Box, Flex, Heading, Stack, Table as ChakraTable, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useMediaQuery} from '@chakra-ui/react';
import {isBefore} from 'date-fns';
import {ReactElement, ReactNode} from 'react';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import {TODAYS_DATE} from '@/shared/const/date.ts';
import {MEDIA_QUERY} from '@/shared/const/media.ts';
import {SortDirectionEnum} from '@/shared/types/sortDirection.ts';
import {StatusEnum} from '@/shared/types/task.ts';
import {BlurBox, Tooltip} from '@/shared/ui';
import {Column} from '../model/types.ts';
import {useTable} from '../model/useTable.ts';
import {Filters} from './Filters.tsx';
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
const MAX_ROW_LENGTH = 40;

export const Table = <T extends {_id: string; expDate: Date; status: StatusEnum}>({
  items,
  heading,
  pageSizeOptions = DEFAULT_PAGINATION,
  columns,
  maxRowLength = MAX_ROW_LENGTH
}: Props<T>): ReactElement => {
  const [isLargerThan900] = useMediaQuery(MEDIA_QUERY.MIN_WIDTH_TABLET, {
    ssr: false
  });
  const {
    state,
    onChangeSort,
    onChangeSearch,
    onChangeFilter,
    onResetFilter,
    dispatch,
    filteredRows,
    rows,
    sortField,
    sortDirection,
    filters,
    values
  } = useTable<T>({
    items,
    defaultPageSizeOptions: pageSizeOptions
  });
  const {pageIndex, pageSize} = state;
  const isEmptyTable = filteredRows.length < 1;
  const displayedItemsCount = isLargerThan900 ? maxRowLength : 10;
  const tdPadding = isLargerThan900 ? '5px' : '2px';
  const tdFontSize = {base: '8px', sm: '8px', md: '8px', lg: '12px', xl: '14px'};
  const boxHeight = isLargerThan900 ? '721px' : '500px';
  const tableHeight = isLargerThan900 ? '544px' : '300px';

  const renderCell = (columns: Column<T>[], row: T, dateIsExpired: boolean) => {
    return columns.map((column) => {
      const value = row[column.accessor as keyof T];
      if (column.isTruncated && typeof value === 'string' && value.length > displayedItemsCount) {
        const truncatedValue = `${value.slice(0, displayedItemsCount)}...`;

        return (
          <Td
            w={column.width}
            fontSize={tdFontSize}
            padding={tdPadding}
            key={`${row._id}-${column.accessor}`}
            opacity={column.accessor !== 'actions' && dateIsExpired ? 0.3 : 1}
          >
            <Tooltip label={value} aria-label="Full text">
              {truncatedValue}
            </Tooltip>
          </Td>
        );
      }

      return (
        <Td
          w={column.width}
          fontSize={tdFontSize}
          padding={tdPadding}
          key={`${row._id}-${column.accessor}`}
          opacity={column.accessor !== 'actions' && dateIsExpired ? 0.3 : 1}
        >
          {(column.cell ? column.cell(row[column.accessor as keyof T], row) : row[column.accessor as keyof T]) as ReactNode}
        </Td>
      );
    });
  };

  return (
    <Stack gap={5}>
      <Filters<T> onChangeFilter={onChangeFilter} values={values} columns={columns} />
      <BlurBox minH={boxHeight} mb={50} display="flex" flexDirection="column" justifyContent="space-between">
        <TableHeader<T> heading={heading} onResetFilter={onResetFilter} onChangeSearch={onChangeSearch} filters={filters} items={items} />
        <TableContainer w="100%" height="100%" minH={tableHeight}>
          <ChakraTable size="sm" variant="unstyled" fontWeight="bold">
            <Thead borderBottom="borderSecondary">
              <Tr>
                {columns.map(({header, accessor}) => (
                  <Th key={accessor} padding={1} fontSize={{base: '10px', sm: '10px', md: '10px', lg: '12px', xl: '12px'}}>
                    <Flex gap={1}>
                      <Flex gap={1} cursor="pointer" alignItems="center">
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
                          {sortField === accessor ? sortDirection === SortDirectionEnum.Ascending ? <IoIosArrowDown /> : <IoIosArrowUp /> : ''}
                        </Box>
                      </Flex>
                    </Flex>
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody position="relative">
              {isEmptyTable || !rows ? (
                <Tr>
                  <Td colSpan={columns.length}>
                    <Flex minH="600px" justifyContent="center" alignItems="center">
                      <Heading textAlign="center">Table is empty</Heading>
                    </Flex>
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
        </TableContainer>
        {!isEmptyTable && (
          <TablePagination
            pageSize={pageSize}
            dispatch={dispatch}
            pageIndex={pageIndex}
            totalItemsCount={filteredRows.length}
            pageSizeOptions={pageSizeOptions}
          />
        )}
      </BlurBox>
    </Stack>
  );
};
