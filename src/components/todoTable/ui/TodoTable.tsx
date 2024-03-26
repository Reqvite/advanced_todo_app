import {Table, TableContainer, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react';
import {useState} from 'react';
import {TodoI} from '@/shared/types/todo.ts';
import {BlurBox} from '@/shared/ui';
import {PaginationTable} from './PaginationTable';
import {TodoItem} from './TodoItem.tsx';
import {TodoTableHeader} from './TodoTableHeader.tsx';

const mockData: TodoI[] = [
  {
    _id: '1',
    note: 'Some SomeSomeSomeSomeSomeSo',
    priority: 'urgent',
    expDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
    tags: ['personal', 'work', 'shopping', 'study']
  },
  {
    _id: '2',
    note: 'Another',
    priority: 'low',
    expDate: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['shopping', 'study']
  },
  {
    _id: '3',
    note: 'Example',
    priority: 'medium',
    expDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['work', 'shopping']
  },
  {_id: '4', note: 'Test', priority: 'urgent', expDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(), tags: ['personal', 'tag6']},
  {_id: '5', note: 'Demo', priority: 'urgent', expDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(), tags: ['tag7', 'tag8']},
  {_id: '6', note: 'Data', priority: 'low', expDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(), tags: ['work', 'tag9']},
  {_id: '7', note: 'Information', priority: 'medium', expDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(), tags: ['tag10', 'tag11']},
  {_id: '8', note: 'Task', priority: 'urgent', expDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(), tags: ['tag12', 'tag13']},
  {_id: '9', note: 'Assignment', priority: 'urgent', expDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(), tags: ['tag14', 'tag15']},
  {_id: '10', note: 'Project', priority: 'low', expDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(), tags: ['tag16', 'tag17']},
  {_id: '11', note: 'Job', priority: 'medium', expDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(), tags: ['tag18', 'tag19']},
  {_id: '12', note: 'Work', priority: 'urgent', expDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(), tags: ['tag20', 'tag21']},
  {_id: '13', note: 'Assignment', priority: 'urgent', expDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(), tags: ['tag22', 'tag23']},
  {_id: '14', note: 'Task', priority: 'low', expDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(), tags: ['tag24', 'tag25']},
  {_id: '15', note: 'Test', priority: 'medium', expDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(), tags: ['tag26', 'tag27']},
  {_id: '16', note: 'Demo', priority: 'urgent', expDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(), tags: ['tag28', 'tag29']},
  {_id: '17', note: 'Data', priority: 'urgent', expDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(), tags: ['tag30', 'tag31']},
  {_id: '18', note: 'Information', priority: 'low', expDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(), tags: ['tag32', 'tag33']},
  {_id: '19', note: 'Example', priority: 'medium', expDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(), tags: ['tag34', 'tag35']},
  {_id: '20', note: 'Task', priority: 'urgent', expDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(), tags: ['tag36', 'tag37']},
  {_id: '21', note: 'Assignment', priority: 'urgent', expDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(), tags: ['tag38', 'tag39']}
];

export const TodoTable = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [data] = useState(mockData);
  const [loading] = useState(false);

  return (
    <BlurBox>
      <TodoTableHeader />
      <TableContainer w={'100%'}>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th />
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
              <Th />
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
              data.map((todo) => <TodoItem key={todo._id} {...todo} />).slice(pageSize * pageIndex, pageSize * (pageIndex + 1))
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
