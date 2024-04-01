import {Priority, Tag} from '@/shared/types/task';

const enumLabelResolver = {
  priority: {
    [Priority.LOW]: 'Low',
    [Priority.MEDIUM]: 'Medium',
    [Priority.HIGH]: 'High',
    [Priority.CRITICAL]: 'Critical'
  },
  tag: {
    [Tag.PERSONAL]: 'Personal',
    [Tag.SHOPPING]: 'Shopping',
    [Tag.STUDY]: 'Study',
    [Tag.WORK]: 'Work'
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
