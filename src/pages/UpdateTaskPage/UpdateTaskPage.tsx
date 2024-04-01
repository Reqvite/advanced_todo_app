import {Spinner} from '@chakra-ui/react';
import {ReactElement} from 'react';
import {useParams} from 'react-router';
import {Form, FormInputVariants, FormOption} from '@/components/form';
import {priorityOptions, tagOptions} from '@/shared/lib/helpers';
import {updateTaskSchema} from '@/shared/lib/yup/updateTask.schema';
import {TaskFormModel} from '@/shared/models';
import {useGetTaskByIdQuery, useUpdateTaskByIdMutation} from '@/slices/todo/todo.rtk';

const options: FormOption<FormInputVariants>[] = [
  {id: 'note', variant: FormInputVariants.Input, name: 'Note'},
  {id: 'priority', variant: FormInputVariants.Select, name: 'Priority', labelOptions: priorityOptions},
  {id: 'expDate', variant: FormInputVariants.Datepicker, name: 'Expiration date', minDate: new Date().toISOString().split('T')[0]},
  {id: 'tags', variant: FormInputVariants.MultiSelect, name: 'Tags', labelOptions: tagOptions}
];

const UpdateTaskPage = (): ReactElement => {
  const {id} = useParams();
  const {data: {data} = {}, isLoading: taskIsLoading} = useGetTaskByIdQuery(id);
  const [updateTask, {isLoading: updateTaskIsLoading}] = useUpdateTaskByIdMutation();

  if (taskIsLoading) {
    return <Spinner />;
  }

  const onSubmit = (updatedTask: TaskFormModel) => {
    const tags = updatedTask.tags.map(({value}) => value);
    updatedTask.tags = tags;
    updateTask({id, updatedTask});
  };

  const defaultValues = new TaskFormModel(data);

  return (
    <Form<TaskFormModel>
      heading={`Update task #${id}`}
      options={options}
      formValidationSchema={updateTaskSchema}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      isLoading={updateTaskIsLoading}
    />
  );
};

export default UpdateTaskPage;
