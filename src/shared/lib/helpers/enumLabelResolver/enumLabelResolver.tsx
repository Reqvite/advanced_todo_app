import {FcHighPriority} from 'react-icons/fc';
import {MdCircle} from 'react-icons/md';
import {PriorityEnum, StatusEnum, TagEnum} from '@/shared/types/task';

export const enumLabelResolver = {
  priority: {
    [PriorityEnum.ALL]: {label: 'All', icon: null},
    [PriorityEnum.LOW]: {label: 'Low', icon: <MdCircle color="green" />},
    [PriorityEnum.MEDIUM]: {label: 'Medium', icon: <MdCircle color="yellow" />},
    [PriorityEnum.HIGH]: {label: 'High', icon: <MdCircle color="orange" />},
    [PriorityEnum.CRITICAL]: {label: 'Critical', icon: <FcHighPriority />}
  },
  tag: {
    [TagEnum.PERSONAL]: 'Personal',
    [TagEnum.SHOPPING]: 'Shopping',
    [TagEnum.STUDY]: 'Study',
    [TagEnum.WORK]: 'Work'
  },
  status: {
    [StatusEnum.ALL]: 'All',
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
