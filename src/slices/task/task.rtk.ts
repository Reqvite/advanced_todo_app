import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {TaskFormModel} from '@/shared/models';
import {ApiPath} from '@/shared/types/apiPath';
import {RtkApiTags} from '@/shared/types/rtkApiTags';
import {TaskI} from '@/shared/types/task';

export const tasksApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_API_URL}${ApiPath.TASKS}`}),
  tagTypes: [RtkApiTags.Task, RtkApiTags.Tasks],
  endpoints: (builder) => ({
    getTasks: builder.query<{data: TaskI[]}, void>({
      query: () => ``,
      providesTags: [RtkApiTags.Tasks]
    }),

    getTaskById: builder.query<{data: TaskI}, string | undefined>({
      query: (id) => `${id}`,
      providesTags: [RtkApiTags.Task]
    }),

    createTask: builder.mutation<{data: TaskI}, {task: TaskFormModel}>({
      query: ({task}) => ({
        url: `/`,
        method: 'POST',
        body: task
      }),
      invalidatesTags: [RtkApiTags.Tasks]
    }),

    updateTaskById: builder.mutation<{data: TaskI}, {id: string | undefined; task: Partial<TaskFormModel>}>({
      query: ({id, task}) => ({
        url: `/${id}`,
        method: 'PUT',
        body: task
      }),
      invalidatesTags: [RtkApiTags.Tasks, RtkApiTags.Task]
    })
  })
});

export const {useGetTasksQuery, useGetTaskByIdQuery, useUpdateTaskByIdMutation, useCreateTaskMutation} = tasksApi;
