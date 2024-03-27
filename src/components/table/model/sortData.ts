import orderBy from 'lodash.orderby';
import {SortDirection} from '@/shared/types/sortDirection';

let direction: SortDirection = SortDirection.Ascending;

export const sortData = <T>(field: string, data: T[]): {sortedData: T[]; direction: SortDirection} => {
  direction = direction === SortDirection.Ascending ? SortDirection.Descending : SortDirection.Ascending;
  const names = field.split('.');
  const sortOrder = direction === SortDirection.Ascending ? 'asc' : 'desc';
  const sortedData = orderBy(data, names, sortOrder);

  return {sortedData, direction};
};
