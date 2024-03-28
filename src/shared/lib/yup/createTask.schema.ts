import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const createTask = yup.object().shape({
  note: yup.string().min(2, 'Минимальная длина 5 символов').required(),
  priority: yup.string().required()
});

export const createTaskSchema = yupResolver(createTask);
