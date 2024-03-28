import {Form, FormInputVariants, FormOption} from '@/components/form';
import {priorityOptions} from '@/shared/lib/helpers';
import {createTaskSchema} from '@/shared/lib/yup/createTask.schema';

const options: FormOption<FormInputVariants>[] = [
  {id: 'note', variant: FormInputVariants.Input, name: 'Note', isRequired: true},
  {id: 'priority', variant: FormInputVariants.Select, name: 'Priority', labelOptions: priorityOptions, isRequired: true},
  {id: 'expDate', variant: FormInputVariants.Datepicker, name: 'Expiration date', isRequired: true}
];

const CreateTaskPage = () => {
  return <Form heading="Create task" options={options} formValidationSchema={createTaskSchema} />;
};

export default CreateTaskPage;
