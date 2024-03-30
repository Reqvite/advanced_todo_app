import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {ErrorMessages} from '@/shared/const';
import {priorityOptions} from '../helpers';

const updateTask = yup.object().shape({
  note: yup.string().min(2, ErrorMessages.minLength(2)),
  priority: yup.number().oneOf(priorityOptions.map(({value}) => value)),
  expDate: yup.date(),
  tags: yup.array()
});

export const updateTaskSchema = yupResolver(updateTask);
