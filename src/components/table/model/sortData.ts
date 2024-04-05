import orderBy from 'lodash.orderby';
import {SortDirectionEnum} from '@/shared/types/sortDirection';

export const sortData = <T>(field: string, data: T[], currentDirection: SortDirectionEnum): {data: T[]; direction: SortDirectionEnum} => {
  const direction = currentDirection === SortDirectionEnum.Ascending ? SortDirectionEnum.Descending : SortDirectionEnum.Ascending;
  const names = field.split('.');
  const sortOrder = direction === SortDirectionEnum.Ascending ? 'asc' : 'desc';
  const sortedData = orderBy(data, names, sortOrder);

  return {data: sortedData, direction};
};
