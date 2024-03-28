import {Form, FormInputVariants, FormOption} from '@/components/form';
import {priorityOptions} from '@/shared/lib/helpers';

const options: FormOption<FormInputVariants>[] = [
  {id: 'note', variant: FormInputVariants.Input, name: 'Note'},
  {id: 'priority', variant: FormInputVariants.Select, name: 'Priority', labelOptions: priorityOptions},
  {id: 'expDate', variant: FormInputVariants.Datepicker, name: 'Expiration date'}
];

const CreateTaskPage = () => {
  return <Form heading="Create task" options={options} />;
};

export default CreateTaskPage;
