import {Flex, Table, TableContainer, Tag, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react';
import {useState} from 'react';
import {DeleteButton, EditButton} from '@/shared/ui';
import {PaginationTable} from './PaginationTable';

export const TodoTable = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [data] = useState([{_id: 1, note: 'Some', priority: 'fast', expDate: 'today', tags: ['tag1', 'tag2']}]);
  const [loading] = useState(false);

  return (
    <TableContainer w={'100%'}>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>
              <span>Note</span>
            </Th>
            <Th>
              <span>Priority</span>
            </Th>
            <Th>
              <span>Tags</span>
            </Th>
            <Th>
              <span>Expiration date</span>
            </Th>
            <Th>
              <span></span>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <Tr>
              <Td textAlign={'center'} colSpan={9}>
                Loading
              </Td>
            </Tr>
          ) : data.length < 1 || !data ? (
            <Tr>
              <Td textAlign={'center'} colSpan={9}>
                You don't create any todo yet
              </Td>
            </Tr>
          ) : (
            data
              .map(({_id, note, priority, expDate, tags}) => {
                return (
                  <Tr key={_id}>
                    <Td width={'40%'}>{note}</Td>
                    <Td>{priority}</Td>
                    <Td>
                      <Flex gap={2}>
                        {tags.map((tag, idx) => (
                          <Tag key={idx} variant="solid" colorScheme="teal">
                            {tag}
                          </Tag>
                        ))}
                      </Flex>
                    </Td>
                    <Td>{expDate}</Td>
                    <Td>
                      <Flex gap={2}>
                        <DeleteButton />
                        <EditButton />
                      </Flex>
                    </Td>
                  </Tr>
                );
              })
              .slice(pageSize * pageIndex, pageSize * (pageIndex + 1))
          )}
        </Tbody>
      </Table>
      <PaginationTable
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        totalItemsCount={data.length}
        pageSizeOptions={[10, 20, 50]}
      />
    </TableContainer>
  );
};
