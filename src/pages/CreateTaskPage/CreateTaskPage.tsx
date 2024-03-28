import {Form, FormInputVariants, FormOption} from '@/components/form';
import {priorityOptions, tagOptions} from '@/shared/lib/helpers';
import {createTaskSchema} from '@/shared/lib/yup/createTask.schema';

const options: FormOption<FormInputVariants>[] = [
  {id: 'note', variant: FormInputVariants.Input, name: 'Note', isRequired: true},
  {id: 'priority', variant: FormInputVariants.Select, name: 'Priority', labelOptions: priorityOptions, isRequired: true},
  {id: 'expDate', variant: FormInputVariants.Datepicker, name: 'Expiration date', minDate: new Date().toISOString().split('T')[0], isRequired: true},
  {id: 'tags', variant: FormInputVariants.MultiSelect, name: 'Tags', labelOptions: tagOptions}
];
const CreateTaskPage = () => {
  return <Form heading="Create task" options={options} formValidationSchema={createTaskSchema} />;
};

export default CreateTaskPage;
