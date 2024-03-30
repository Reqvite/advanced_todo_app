import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {ErrorMessages} from '@/shared/const';
import {priorityOptions} from '../helpers';

const createTask = yup.object().shape({
  note: yup.string().min(2, ErrorMessages.minLength(2)).required(ErrorMessages.isRequired('Note')),
  priority: yup
    .number()
    .oneOf(priorityOptions.map(({value}) => value))
    .required(ErrorMessages.isRequired('Priority')),
  expDate: yup.date().required(ErrorMessages.isRequired('Expiration date')),
  tags: yup.array()
});

export const createTaskSchema = yupResolver(createTask);
