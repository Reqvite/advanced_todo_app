import {TaskFormModel} from '@/shared/models';
import {TaskI} from '@/shared/types/task';

export const transformTaskData = (task: TaskFormModel): TaskI => {
  const tags = task.tags.map(({value}) => value);
  task.tags = tags;
  task.expDate = new Date(task.expDate);
  return task as TaskI;
};
