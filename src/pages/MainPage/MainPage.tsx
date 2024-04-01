import {Box} from '@chakra-ui/layout';
import {Spinner} from '@chakra-ui/react';
import {ReactElement} from 'react';
import {Table} from '@/components/table';
import {TaskI} from '@/shared/types/task';
import {useGetTasksQuery} from '@/slices/todo/todo.rtk';
import {getColumns} from './model/getColumns';

const MainPage = (): ReactElement => {
  const {data: {data} = {data: []}, isLoading} = useGetTasksQuery();

  if (isLoading) {
    return <Spinner />;
  }

  const onToggleTask = (id: string) => {
    console.log(id);
  };

  const columns = getColumns({onToggleTask});

  return (
    <Box>
      <Table<TaskI> items={data} columns={columns} heading="Tasks" />
    </Box>
  );
};

export default MainPage;
