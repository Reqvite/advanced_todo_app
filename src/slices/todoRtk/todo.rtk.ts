import {rtkApi} from '@/shared/api/rtkApi';
import {TaskI} from '@/shared/types/task';

export const tasksApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getTaskById: builder.query<TaskI, string>({
      query: (id) => `tasks/${id}`
    })
  })
});

export const useGetTask = tasksApi.useGetTaskByIdQuery;
