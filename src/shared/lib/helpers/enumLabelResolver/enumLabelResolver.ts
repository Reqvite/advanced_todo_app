import {PriorityEnum, StatusEnum, TagEnum} from '@/shared/types/task';

const enumLabelResolver = {
  priority: {
    [PriorityEnum.ALL]: 'All',
    [PriorityEnum.LOW]: 'Low',
    [PriorityEnum.MEDIUM]: 'Medium',
    [PriorityEnum.HIGH]: 'High',
    [PriorityEnum.CRITICAL]: 'Critical'
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

const priorityOptions = Object.entries(enumLabelResolver.priority)
  .filter(([value]) => value !== '0')
  .map(([value, label]) => ({
    label,
    value: Number(value)
  }));
const priorityOptionsWithAll = Object.entries(enumLabelResolver.priority).map(([value, label]) => ({
  label,
  value: Number(value)
}));
const tagOptions = Object.entries(enumLabelResolver.tag).map(([value, label]) => ({
  label,
  value: Number(value)
}));
const statusOptionsWithALL = Object.entries(enumLabelResolver.status).map(([value, label]) => ({
  label,
  value: Number(value)
}));

export {priorityOptions, priorityOptionsWithAll, statusOptionsWithALL, tagOptions};
