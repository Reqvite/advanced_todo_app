import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {TaskFormModel} from '@/shared/models';
import {ApiPathEnum} from '@/shared/types/apiPath';
import {RtkApiTagsEnum} from '@/shared/types/rtkApiTags';
import {StatusEnum, TaskI} from '@/shared/types/task';

export const tasksApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_API_URL}${ApiPathEnum.TASKS}`}),
  tagTypes: [RtkApiTagsEnum.Task, RtkApiTagsEnum.Tasks],
  endpoints: (builder) => ({
    getTasks: builder.query<{data: TaskI[]}, void>({
      query: () => ``,
      providesTags: [RtkApiTagsEnum.Tasks]
    }),

    getTaskById: builder.query<{data: TaskI}, string | undefined>({
      query: (id) => `${id}`,
      providesTags: [RtkApiTagsEnum.Task]
    }),

    createTask: builder.mutation<{data: TaskI}, {task: TaskFormModel}>({
      query: ({task}) => ({
        url: `/`,
        method: 'POST',
        body: task
      }),
      invalidatesTags: [RtkApiTagsEnum.Tasks]
    }),

    updateTaskById: builder.mutation<{data: TaskI}, {id: string | undefined; task: Partial<TaskFormModel>}>({
      query: ({id, task}) => ({
        url: `/${id}`,
        method: 'PUT',
        body: task
      }),
      invalidatesTags: [RtkApiTagsEnum.Tasks, RtkApiTagsEnum.Task]
    }),

    updateTaskStatusById: builder.mutation<{data: TaskI}, {id: string | undefined; status: StatusEnum}>({
      query: ({id, status}) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: {status}
      }),
      invalidatesTags: [RtkApiTagsEnum.Tasks]
    })
  })
});

export const {useGetTasksQuery, useGetTaskByIdQuery, useUpdateTaskByIdMutation, useCreateTaskMutation, useUpdateTaskStatusByIdMutation} = tasksApi;
