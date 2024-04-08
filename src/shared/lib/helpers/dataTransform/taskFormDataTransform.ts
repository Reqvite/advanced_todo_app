import {TaskFormModel} from '@/shared/models';
import {TaskI} from '@/shared/types/task';

export const transformTaskData = (data: TaskFormModel): TaskI => {
  const tags = data.tags.map(({value}) => value);
  data.tags = tags;
  data.expDate = new Date(data.expDate);
  return data as TaskI;
};
