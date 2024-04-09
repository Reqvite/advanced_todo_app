import {isEqual, startOfDay} from 'date-fns';

interface FiltersI {
  [key: string]: string | number | [string, string];
}

const DATE = 'date';

const applyDateRangeFilter = (item: Record<string, any>, key: string, filterKey: [string, string]): boolean => {
  const [startTimestamp, endTimestamp] = filterKey.map((date) => startOfDay(date).getTime());
  const itemTimestamp = startOfDay(item[key]).getTime();

  return itemTimestamp >= startTimestamp && itemTimestamp <= endTimestamp;
};

const applySingleDateFilter = (item: Record<string, any>, key: string, filterKey: string): boolean => {
  const filterDate = startOfDay(filterKey);
  const keyDate = startOfDay(item[key]);

  return isEqual(filterDate, keyDate);
};

export const applyFilters = <T extends Record<string, any>>({data}: {data: T[]}, filters: FiltersI) => {
  const filteredData = data.filter((item) => {
    return Object.keys(filters).every((key) => {
      const filterKey = filters[key];
      const keyToLowerCase = key.toLocaleLowerCase();

      if (Number(filterKey) === 0) {
        return true;
      }

      if (!filterKey) {
        return true;
      }

      if (keyToLowerCase.includes(DATE) && Array.isArray(filterKey) && filterKey.length === 2) {
        return applyDateRangeFilter(item, key, filterKey as [string, string]);
      }

      if (keyToLowerCase.includes(DATE)) {
        return applySingleDateFilter(item, key, filterKey as string);
      }

      if (Array.isArray(filterKey)) {
        return filterKey.includes(item[key]);
      }

      return item[key] === filterKey;
    });
  });

  return filteredData;
};
