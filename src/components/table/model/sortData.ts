import orderBy from 'lodash.orderby';
import {SortDirectionEnum} from '@/shared/types/sortDirection';

let direction: SortDirectionEnum = SortDirectionEnum.Ascending;

export const sortData = <T>(field: string, data: T[]): {sortedData: T[]; direction: SortDirectionEnum} => {
  direction = direction === SortDirectionEnum.Ascending ? SortDirectionEnum.Descending : SortDirectionEnum.Ascending;
  const names = field.split('.');
  const sortOrder = direction === SortDirectionEnum.Ascending ? 'asc' : 'desc';
  const sortedData = orderBy(data, names, sortOrder);

  return {sortedData, direction};
};
