import {Box} from '@chakra-ui/layout';
import {ReactElement} from 'react';
import {Table} from '@/components/table';
import {TaskI} from '@/shared/types/task';
import {Loader} from '@/shared/ui';
import {useDeleteTaskByIdMutation, useGetTasksQuery, useUpdateTaskStatusByIdMutation} from '@/slices/task/task.rtk';
import {getColumns} from './model/getColumns';

const MainPage = (): ReactElement => {
  const {data: {data} = {data: []}, isLoading} = useGetTasksQuery();
  const [updateTaskStatus, {isLoading: updateTaskStatusIsLoading}] = useUpdateTaskStatusByIdMutation();
  const [deleteTask, {isLoading: taskDeleteIsLoading}] = useDeleteTaskByIdMutation();

  if (isLoading) {
    return <Loader fullHeight />;
  }

  const columns = getColumns({updateTaskStatus, deleteTask, updateTaskStatusIsLoading, taskDeleteIsLoading});

  return (
    <Box>
      <Table<TaskI> items={data} columns={columns} heading="Tasks" />
    </Box>
  );
};

export default MainPage;
