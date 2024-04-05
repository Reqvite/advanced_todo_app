import orderBy from 'lodash.orderby';
import {SortDirectionEnum} from '@/shared/types/sortDirection';

let direction: SortDirectionEnum = SortDirectionEnum.Ascending;

export const sortData = <T>(field: string, data: T[]): {data: T[]; direction: SortDirectionEnum} => {
  console.log(SortDirectionEnum.Ascending);
  console.log(SortDirectionEnum.Descending);
  direction = direction === SortDirectionEnum.Ascending ? SortDirectionEnum.Descending : SortDirectionEnum.Ascending;
  const names = field.split('.');
  const sortOrder = direction === SortDirectionEnum.Ascending ? 'asc' : 'desc';
  const sortedData = orderBy(data, names, sortOrder);

  return {data: sortedData, direction};
};
