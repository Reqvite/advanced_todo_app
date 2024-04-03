import {ReactElement} from 'react';
import {useNavigate} from 'react-router-dom';
import {getRouteMain} from '@/app/providers/AppRouter/routeConfig';
import {Form, FormInputVariantsEnum, FormOption} from '@/components/form';
import {priorityOptions, tagOptions} from '@/shared/lib/helpers';
import {createTaskSchema} from '@/shared/lib/yup/createTask.schema';
import {TaskFormModel} from '@/shared/models';
import {useCreateTaskMutation} from '@/slices/task/task.rtk';

const options: FormOption<FormInputVariantsEnum>[] = [
  {id: 'note', variant: FormInputVariantsEnum.Input, name: 'Note', isRequired: true},
  {id: 'priority', variant: FormInputVariantsEnum.Select, name: 'Priority', labelOptions: priorityOptions, isRequired: true},
  {
    id: 'expDate',
    variant: FormInputVariantsEnum.Datepicker,
    name: 'Expiration date',
    minDate: new Date().toISOString().split('T')[0],
    isRequired: true
  },
  {id: 'tags', variant: FormInputVariantsEnum.MultiSelect, name: 'Tags', labelOptions: tagOptions}
];

const CreateTaskPage = (): ReactElement => {
  const [createTask, {isLoading: isLoading}] = useCreateTaskMutation();
  const navigate = useNavigate();

  const onSubmit = async (task: TaskFormModel): Promise<void> => {
    const tags = task.tags.map(({value}) => value);
    task.tags = tags;
    await createTask({task});
    navigate(getRouteMain());
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
