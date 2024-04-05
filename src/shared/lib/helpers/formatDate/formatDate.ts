import {format} from 'date-fns';

export const formatDate = (date: Date): string => {
  return format(date, 'MMM d, yyyy');
};

export const formatMonthWithYearDate = (date: Date | null) => {
  return format(date || new Date(), 'MMMM yyyy');
};

export const formatDayDate = (date?: Date) => {
  return format(date || new Date(), 'd');
};
