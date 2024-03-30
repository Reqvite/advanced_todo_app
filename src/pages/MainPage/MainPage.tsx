import {Box} from '@chakra-ui/layout';
import {ReactElement} from 'react';
import {Table} from '@/components/table';
import {TaskI} from '@/shared/types/task';
import {getColumns} from './model/getColumns';

const today = new Date();

const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const mockData: TaskI[] = [
  {
    _id: '1',
    note: 'Tas232',
    priority: 4,
    tags: [1, 2],
    expDate: yesterday.toISOString()
  },
  {
    _id: '2',
    note: 'Task 2',
    priority: 3,
    tags: [2, 3],
    expDate: yesterday.toISOString()
  },
  {
    _id: '6606c9a1d1763a883d766671',
    note: 'Task 3',
    priority: 2,
    tags: [1, 4],
    expDate: new Date().toISOString()
  }
];

const MainPage = (): ReactElement => {
  const onToggleTask = (id: string) => {
    console.log(id);
  };

  const columns = getColumns({onToggleTask});

  return (
    <Box>
      <Table<TaskI> items={mockData} columns={columns} heading="Tasks" />
    </Box>
  );
};

export default MainPage;
