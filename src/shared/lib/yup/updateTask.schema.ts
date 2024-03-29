import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {ErrorMessages} from '@/shared/const';

const updateTask = yup.object().shape({
  note: yup.string().min(2, ErrorMessages.minLength(2)),
  priority: yup.object(),
  expDate: yup.date(),
  tags: yup.array()
});

export const updateTaskSchema = yupResolver(updateTask);
