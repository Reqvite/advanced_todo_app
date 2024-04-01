import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {TaskFormModel} from '@/shared/models';
import {ApiPath} from '@/shared/types/apiPath';
import {RtkApiTags} from '@/shared/types/rtkApiTags';
import {TaskI} from '@/shared/types/task';

interface Data {
  data: TaskI;
}
interface ArrayOfData {
  data: TaskI[] | [];
}

export const tasksApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_API_URL}${ApiPath.TASKS}`}),
  tagTypes: [RtkApiTags.Task, RtkApiTags.Tasks],
  endpoints: (builder) => ({
    getTasks: builder.query<ArrayOfData, void>({
      query: () => ``,
      providesTags: [RtkApiTags.Tasks]
    }),

    getTaskById: builder.query<Data, string | undefined>({
      query: (id) => `${id}`,
      providesTags: [RtkApiTags.Task]
    }),

    createTask: builder.mutation<Data, {newTask: TaskFormModel}>({
      query: ({newTask}) => ({
        url: `/`,
        method: 'POST',
        body: newTask
      }),
      invalidatesTags: [RtkApiTags.Tasks]
    }),

    updateTaskById: builder.mutation<Data, {id: string | undefined; updatedTask: Partial<TaskFormModel>}>({
      query: ({id, updatedTask}) => ({
        url: `/${id}`,
        method: 'PUT',
        body: updatedTask
      }),
      invalidatesTags: [RtkApiTags.Tasks, RtkApiTags.Task]
    })
  })
});

export const {useGetTasksQuery, useGetTaskByIdQuery, useUpdateTaskByIdMutation, useCreateTaskMutation} = tasksApi;
