import {Box} from '@chakra-ui/layout';
import {ReactElement} from 'react';
import {Table} from '@/components/table';
import {TaskI} from '@/shared/types/task';
import {TaskItem} from '@/shared/ui';

const today = new Date();

const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const mockData: TaskI[] = [
  {
    _id: '1',
    note: 'Task 1',
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
  },
  {
    _id: '4',
    note: 'Task 4',
    priority: 1,
    tags: [2, 3],
    expDate: new Date().toISOString()
  },
  {
    _id: '5',
    note: 'Task 5',
    priority: 4,
    tags: [4, 3],
    expDate: new Date().toISOString()
  },
  {
    _id: '6',
    note: 'Task 6',
    priority: 3,
    tags: [2, 4],
    expDate: new Date().toISOString()
  },
  {
    _id: '7',
    note: 'Task 7',
    priority: 2,
    tags: [3, 1],
    expDate: new Date().toISOString()
  },
  {
    _id: '8',
    note: 'Task 8',
    priority: 1,
    tags: [4, 2],
    expDate: new Date().toISOString()
  },
  {
    _id: '9',
    note: 'Task 9',
    priority: 4,
    tags: [1, 3],
    expDate: new Date().toISOString()
  },
  {
    _id: '10',
    note: 'Task 10',
    priority: 3,
    tags: [2, 1],
    expDate: new Date().toISOString()
  },
  {
    _id: '11',
    note: 'Task 11',
    priority: 2,
    tags: [3, 4],
    expDate: new Date().toISOString()
  },
  {
    _id: '12',
    note: 'Task 12',
    priority: 1,
    tags: [1, 2],
    expDate: new Date().toISOString()
  },
  {
    _id: '13',
    note: 'Task 13',
    priority: 4,
    tags: [2, 3],
    expDate: new Date().toISOString()
  },
  {
    _id: '14',
    note: 'Task 14',
    priority: 3,
    tags: [3, 4],
    expDate: new Date().toISOString()
  },
  {
    _id: '15',
    note: 'Task 15',
    priority: 2,
    tags: [4, 1],
    expDate: new Date().toISOString()
  },
  {
    _id: '16',
    note: 'Task 16',
    priority: 1,
    tags: [1, 3],
    expDate: new Date().toISOString()
  },
  {
    _id: '17',
    note: 'Task 17',
    priority: 4,
    tags: [2, 4],
    expDate: new Date().toISOString()
  },
  {
    _id: '18',
    note: 'Task 18',
    priority: 3,
    tags: [3, 1],
    expDate: new Date().toISOString()
  },
  {
    _id: '19',
    note: 'Task 19',
    priority: 2,
    tags: [4, 2],
    expDate: new Date().toISOString()
  },
  {
    _id: '20',
    note: 'Task 20',
    priority: 1,
    tags: [1, 4],
    expDate: new Date().toISOString()
  },
  {
    _id: '21',
    note: 'Task 21',
    priority: 4,
    tags: [2, 3],
    expDate: new Date().toISOString()
  }
];

const MainPage = (): ReactElement => {
  return (
    <Box>
      <Table<TaskI> items={mockData} renderItem={TaskItem} heading="Tasks" />
    </Box>
  );
};

export default MainPage;
