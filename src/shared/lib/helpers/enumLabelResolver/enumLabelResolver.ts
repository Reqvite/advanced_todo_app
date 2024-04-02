import {PriorityEnum, TagEnum} from '@/shared/types/task';

const enumLabelResolver = {
  priority: {
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
  }
};

const priorityOptions = Object.entries(enumLabelResolver.priority).map(([value, label]) => ({
  label,
  value: Number(value)
}));
const tagOptions = Object.entries(enumLabelResolver.tag).map(([value, label]) => ({
  label,
  value: Number(value)
}));

export {priorityOptions, tagOptions};
