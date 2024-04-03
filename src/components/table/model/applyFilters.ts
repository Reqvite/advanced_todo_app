import {isEqual, startOfDay} from 'date-fns';

interface FiltersI {
  [key: string]: string | number | [string, string];
}

const DATE = 'date';

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
        const [startTimestamp, endTimestamp] = filterKey.map((date) => startOfDay(date).getTime());
        const itemTimestamp = startOfDay(item[key]).getTime();
        return itemTimestamp >= startTimestamp && itemTimestamp <= endTimestamp;
      }

      if (keyToLowerCase.includes(DATE)) {
        const filterDate = startOfDay(filterKey as string);
        const keyDate = startOfDay(item[key]);
        return isEqual(filterDate, keyDate);
      }

      return item[key] === filterKey;
    });
  });

  return filteredData;
};
