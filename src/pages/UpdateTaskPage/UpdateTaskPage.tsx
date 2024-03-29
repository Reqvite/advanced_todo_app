import {ReactElement} from 'react';
import {useParams} from 'react-router';
import {Form, FormInputVariants, FormOption} from '@/components/form';
import {priorityOptions, tagOptions} from '@/shared/lib/helpers';
import {updateTaskSchema} from '@/shared/lib/yup/updateTask.schema';
import {TaskFormModel} from '@/shared/models';
import {useGetTask} from '@/slices/todoRtk/todo.rtk';

const options: FormOption<FormInputVariants>[] = [
  {id: 'note', variant: FormInputVariants.Input, name: 'Note'},
  {id: 'priority', variant: FormInputVariants.Select, name: 'Priority', labelOptions: priorityOptions},
  {id: 'expDate', variant: FormInputVariants.Datepicker, name: 'Expiration date', minDate: new Date().toISOString().split('T')[0]},
  {id: 'tags', variant: FormInputVariants.MultiSelect, name: 'Tags', labelOptions: tagOptions}
];

const UpdateTaskPage = (): ReactElement => {
  const {id} = useParams();
  const {data: {data} = {}, isLoading} = useGetTask(id);
  const onSubmit = (data: object) => {
    console.log(data);
  };

  if (isLoading) {
    return null;
  }

  const defaultValues = new TaskFormModel(data);

  console.log(defaultValues);
  return (
    <Form<TaskFormModel>
      heading={`Update task #${id}`}
      options={options}
      formValidationSchema={updateTaskSchema}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
    />
  );
};

export default UpdateTaskPage;
