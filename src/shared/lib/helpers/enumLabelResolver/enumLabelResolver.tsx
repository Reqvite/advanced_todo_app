import {FcHighPriority} from 'react-icons/fc';
import {FcLowPriority, FcMediumPriority} from 'react-icons/fc';
import {FcLeave} from 'react-icons/fc';
import {PriorityEnum, StatusEnum, TagEnum} from '@/shared/types/task';

export const enumLabelResolver = {
  priority: {
    [PriorityEnum.LOW]: {label: 'Low', icon: <FcLowPriority size={18} />},
    [PriorityEnum.MEDIUM]: {label: 'Medium', icon: <FcMediumPriority size={18} />},
    [PriorityEnum.HIGH]: {label: 'High', icon: <FcLeave size={18} />},
    [PriorityEnum.CRITICAL]: {label: 'Critical', icon: <FcHighPriority size={18} />}
  },
  tag: {
    [TagEnum.PERSONAL]: 'Personal',
    [TagEnum.SHOPPING]: 'Shopping',
    [TagEnum.STUDY]: 'Study',
    [TagEnum.WORK]: 'Work'
  },
  status: {
    [StatusEnum.COMPLETED]: 'Completed',
    [StatusEnum.NOT_COMPLETED]: 'Not completed'
  }
};

const tagOptions = Object.entries(enumLabelResolver.tag).map(([value, label]) => ({
  label,
  value: Number(value)
}));
const statusOptionsWithALL = Object.entries(enumLabelResolver.status).map(([value, label]) => ({
  label,
  value: Number(value)
}));

export {statusOptionsWithALL, tagOptions};
