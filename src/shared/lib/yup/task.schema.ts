import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {ErrorMessages} from '@/shared/const';

const createTask = yup.object().shape({
  note: yup.string().min(2, ErrorMessages.minLength(2)).required(ErrorMessages.isRequired('Note')),
  priority: yup.number().required(ErrorMessages.isRequired('Priority')),
  expDate: yup.string().required(ErrorMessages.isRequired('Expiration date')),
  tags: yup.array().of(
    yup.object().shape({
      label: yup.string().required(ErrorMessages.isRequired('Tag label')),
      value: yup.number().required(ErrorMessages.isRequired('Tag value'))
    })
  )
});

export const taskSchema = yupResolver(createTask);
