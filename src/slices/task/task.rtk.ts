import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {NavigateFunction} from 'react-router';
import {getRouteMain} from '@/app/providers/AppRouter/routeConfig';
import {TaskFormModel} from '@/shared/models';
import {notificationApi} from '@/shared/services/notification';
import {NotificationMessage} from '@/shared/services/notification/lib/enums/enums';
import {ApiPathEnum} from '@/shared/types/apiPath';
import {ErrorI} from '@/shared/types/error';
import {RtkApiTagsEnum} from '@/shared/types/rtkApiTags';
import {StatusEnum, TaskI} from '@/shared/types/task';

const onQueryStartedToast = async ({navigate}: {navigate?: NavigateFunction}, {queryFulfilled}: {queryFulfilled: any}, message = 'Success') => {
  try {
    await queryFulfilled;
    notificationApi.success(message);
    if (navigate) {
      navigate(getRouteMain());
    }
  } catch (error: unknown) {
    const {error: customError} = error as ErrorI;
    notificationApi.error(customError.data.error);
  }
};

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
    createTask: builder.mutation<{data: TaskI}, {task: TaskFormModel; navigate: NavigateFunction}>({
      query: ({task}) => ({
        url: `/`,
        method: 'POST',
        body: task
      }),
      invalidatesTags: [RtkApiTagsEnum.Tasks],
      onQueryStarted: ({navigate}, {queryFulfilled}) => onQueryStartedToast({navigate}, {queryFulfilled}, NotificationMessage.SUCCESS('Task created'))
    }),
    updateTaskById: builder.mutation<{data: TaskI}, {id: string; task: Partial<TaskFormModel>; navigate: NavigateFunction}>({
      query: ({id, task}) => ({
        url: `/${id}`,
        method: 'PUT',
        body: task
      }),
      invalidatesTags: [RtkApiTagsEnum.Tasks, RtkApiTagsEnum.Task],
      onQueryStarted: ({navigate}, {queryFulfilled}) => onQueryStartedToast({navigate}, {queryFulfilled}, NotificationMessage.SUCCESS('Task updated'))
    }),
    updateTaskStatusById: builder.mutation<{data: TaskI}, {id: string; status: StatusEnum}>({
      query: ({id, status}) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: {status}
      }),
      invalidatesTags: [RtkApiTagsEnum.Tasks]
    }),
    deleteTaskById: builder.mutation<{data: TaskI}, {id: string}>({
      query: ({id}) => ({
        url: `/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [RtkApiTagsEnum.Tasks],
      onQueryStarted: (_, {queryFulfilled}) => onQueryStartedToast({}, {queryFulfilled}, NotificationMessage.SUCCESS('Task deleted'))
    })
  })
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useUpdateTaskByIdMutation,
  useCreateTaskMutation,
  useUpdateTaskStatusByIdMutation,
  useDeleteTaskByIdMutation
} = tasksApi;
