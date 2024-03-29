import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {ErrorMessages} from '@/shared/const';

const createTask = yup.object().shape({
  note: yup.string().min(2, ErrorMessages.minLength(2)).required(ErrorMessages.isRequired('Note')),
  priority: yup.object().required(ErrorMessages.isRequired('Priority')),
  expDate: yup.date().required(ErrorMessages.isRequired('Expiration date'))
});

export const createTaskSchema = yupResolver(createTask);