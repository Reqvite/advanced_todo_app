import {Flex, Table, TableContainer, Tag, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react';
import {useState} from 'react';
import {BlurBox, DeleteButton, EditButton} from '@/shared/ui';
import {PaginationTable} from './PaginationTable';
import {TodoTableHeading} from './TodoTableHeading';

const mockData = [
  {_id: '1', note: 'Some', priority: 'fast', expDate: 'today', tags: ['tag1', 'tag2']},
  {_id: '2', note: 'Another', priority: 'slow', expDate: 'tomorrow', tags: ['tag3', 'tag4']},
  {_id: '3', note: 'Example', priority: 'medium', expDate: 'next week', tags: ['tag2', 'tag5']},
  {_id: '4', note: 'Test', priority: 'fast', expDate: 'today', tags: ['tag1', 'tag6']},
  {_id: '5', note: 'Demo', priority: 'fast', expDate: 'today', tags: ['tag7', 'tag8']},
  {_id: '6', note: 'Data', priority: 'slow', expDate: 'tomorrow', tags: ['tag2', 'tag9']},
  {_id: '7', note: 'Information', priority: 'medium', expDate: 'next week', tags: ['tag10', 'tag11']},
  {_id: '8', note: 'Task', priority: 'fast', expDate: 'today', tags: ['tag12', 'tag13']},
  {_id: '9', note: 'Assignment', priority: 'fast', expDate: 'today', tags: ['tag14', 'tag15']},
  {_id: '10', note: 'Project', priority: 'slow', expDate: 'tomorrow', tags: ['tag16', 'tag17']},
  {_id: '11', note: 'Job', priority: 'medium', expDate: 'next week', tags: ['tag18', 'tag19']},
  {_id: '12', note: 'Work', priority: 'fast', expDate: 'today', tags: ['tag20', 'tag21']},
  {_id: '13', note: 'Assignment', priority: 'fast', expDate: 'today', tags: ['tag22', 'tag23']},
  {_id: '14', note: 'Task', priority: 'slow', expDate: 'tomorrow', tags: ['tag24', 'tag25']},
  {_id: '15', note: 'Test', priority: 'medium', expDate: 'next week', tags: ['tag26', 'tag27']},
  {_id: '16', note: 'Demo', priority: 'fast', expDate: 'today', tags: ['tag28', 'tag29']},
  {_id: '17', note: 'Data', priority: 'fast', expDate: 'today', tags: ['tag30', 'tag31']},
  {_id: '18', note: 'Information', priority: 'slow', expDate: 'tomorrow', tags: ['tag32', 'tag33']},
  {_id: '19', note: 'Example', priority: 'medium', expDate: 'next week', tags: ['tag34', 'tag35']},
  {_id: '20', note: 'Task', priority: 'fast', expDate: 'today', tags: ['tag36', 'tag37']},
  {_id: '21', note: 'Assignment', priority: 'fast', expDate: 'today', tags: ['tag38', 'tag39']}
];

export const TodoTable = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [data] = useState(mockData);
  const [loading] = useState(false);

  return (
    <BlurBox>
      <TodoTableHeading />
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
                        <Flex justifyContent={'flex-end'}>
                          <Flex gap={2}>
                            <DeleteButton />
                            <EditButton id={_id} />
                          </Flex>
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
    </BlurBox>
  );
};
