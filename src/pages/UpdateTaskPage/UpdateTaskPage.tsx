import {ReactElement} from 'react';
import {useNavigate, useParams} from 'react-router';
import {getRouteMain} from '@/app/providers/AppRouter/routeConfig';
import {Form, FormInputVariantsEnum, FormOption} from '@/components/form';
import {TODAYS_DATE} from '@/shared/const';
import {getPriorityOptions} from '@/shared/lib/helpers';
import {tagOptions} from '@/shared/lib/helpers';
import {taskSchema} from '@/shared/lib/yup/task.schema';
import {TaskFormModel} from '@/shared/models';
import {Loader} from '@/shared/ui';
import {useGetTaskByIdQuery, useUpdateTaskByIdMutation} from '@/slices/task/task.rtk';

const options: FormOption<FormInputVariantsEnum>[] = [
  {id: 'note', variant: FormInputVariantsEnum.Input, name: 'Note'},
  {id: 'priority', variant: FormInputVariantsEnum.Select, name: 'Priority', labelOptions: getPriorityOptions()},
  {id: 'expDate', variant: FormInputVariantsEnum.Datepicker, name: 'Expiration date', minDate: TODAYS_DATE},
  {id: 'tags', variant: FormInputVariantsEnum.MultiSelect, name: 'Tags', labelOptions: tagOptions}
];

const UpdateTaskPage = (): ReactElement | null => {
  const {id} = useParams();
  const {data: {data} = {}, isLoading: taskIsLoading, isError} = useGetTaskByIdQuery(id);
  const [updateTask, {isLoading: updateTaskIsLoading}] = useUpdateTaskByIdMutation();
  const navigate = useNavigate();

  if (!id || isError) {
    navigate(getRouteMain());
    return null;
  }

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
      formValidationSchema={taskSchema}
      defaultValues={new TaskFormModel(data)}
      onSubmit={onSubmit}
      isLoading={updateTaskIsLoading}
    />
  );
};

export default UpdateTaskPage;
