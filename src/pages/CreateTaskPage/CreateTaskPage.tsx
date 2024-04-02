import {ReactElement} from 'react';
import {Form, FormInputVariants, FormOption} from '@/components/form';
import {priorityOptions, tagOptions} from '@/shared/lib/helpers';
import {createTaskSchema} from '@/shared/lib/yup/createTask.schema';
import {TaskFormModel} from '@/shared/models';
import {useCreateTaskMutation} from '@/slices/task/task.rtk';

const options: FormOption<FormInputVariants>[] = [
  {id: 'note', variant: FormInputVariants.Input, name: 'Note', isRequired: true},
  {id: 'priority', variant: FormInputVariants.Select, name: 'Priority', labelOptions: priorityOptions, isRequired: true},
  {id: 'expDate', variant: FormInputVariants.Datepicker, name: 'Expiration date', minDate: new Date().toISOString().split('T')[0], isRequired: true},
  {id: 'tags', variant: FormInputVariants.MultiSelect, name: 'Tags', labelOptions: tagOptions}
];

const CreateTaskPage = (): ReactElement => {
  const [createTask, {isLoading: isLoading}] = useCreateTaskMutation();

  const onSubmit = (task: TaskFormModel): void => {
    const tags = task.tags.map(({value}) => value);
    task.tags = tags;
    createTask({task});
  };

  return (
    <Form<TaskFormModel>
      heading="Create task"
      options={options}
      formValidationSchema={createTaskSchema}
      defaultValues={new TaskFormModel()}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
};

export default CreateTaskPage;
