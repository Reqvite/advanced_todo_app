import {ReactElement} from 'react';
import {useParams} from 'react-router';
import {useNavigate} from 'react-router-dom';
import {getRouteMain} from '@/app/providers/AppRouter/routeConfig';
import {Form, FormInputVariantsEnum, FormOption} from '@/components/form';
import {TODAYS_DATE} from '@/shared/const';
import {getPriorityOptions, tagOptions} from '@/shared/lib/helpers';
import {createTaskSchema} from '@/shared/lib/yup/createTask.schema';
import {TaskFormModel} from '@/shared/models';
import {Loader} from '@/shared/ui';
import {useGetTaskByIdQuery, useUpdateTaskByIdMutation} from '@/slices/task/task.rtk';

const options: FormOption<FormInputVariantsEnum>[] = [
  {id: 'note', variant: FormInputVariantsEnum.Input, name: 'Note'},
  {id: 'priority', variant: FormInputVariantsEnum.Select, name: 'Priority', labelOptions: getPriorityOptions()},
  {id: 'expDate', variant: FormInputVariantsEnum.Datepicker, name: 'Expiration date', minDate: TODAYS_DATE},
  {id: 'tags', variant: FormInputVariantsEnum.MultiSelect, name: 'Tags', labelOptions: tagOptions}
];

const UpdateTaskPage = (): ReactElement => {
  const {id} = useParams();
  const {data: {data} = {}, isLoading: taskIsLoading} = useGetTaskByIdQuery(id);
  const [updateTask, {isLoading: updateTaskIsLoading}] = useUpdateTaskByIdMutation();
  const navigate = useNavigate();

  if (taskIsLoading) {
    return <Loader fullHeight />;
  }

  const onSubmit = (task: TaskFormModel): void => {
    const tags = task.tags.map(({value}) => value);
    task.tags = tags;
    updateTask({id, task});
    navigate(getRouteMain());
  };

  return (
    <Form<TaskFormModel>
      heading={`Update task`}
      options={options}
      formValidationSchema={createTaskSchema}
      defaultValues={new TaskFormModel(data)}
      onSubmit={onSubmit}
      isLoading={updateTaskIsLoading}
    />
  );
};

export default UpdateTaskPage;
