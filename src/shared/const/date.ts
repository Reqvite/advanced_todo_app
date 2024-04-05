import {startOfToday} from 'date-fns';
import {formatDate, formatDayDate, formatMonthWithYearDate} from '../lib/helpers';

export const TODAYS_DATE = startOfToday();

export const FORMAT_DATES = {
  MONTH_DATE_YEAR: (date: Date) => formatDate(date),
  MONTH_YEAR: (date: Date | null) => formatMonthWithYearDate(date),
  DAY: (date: Date) => formatDayDate(date)
} as const;
