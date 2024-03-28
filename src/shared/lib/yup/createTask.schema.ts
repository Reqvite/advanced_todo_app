import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const createTask = yup.object().shape({
  note: yup.string().min(2, 'Minimum length should be 2 characters').required('Note is required'),
  priority: yup.object().required('Priority is required'),
  expDate: yup.date().required('Expiration date is required')
});

export const createTaskSchema = yupResolver(createTask);
