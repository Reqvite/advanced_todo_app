interface FiltersI {
  [key: string]: string | number | [string, string];
}

const DATE = 'date';

export const applyFilters = <T extends Record<string, any>>({data}: {data: T[]}, filters: FiltersI) => {
  const filteredData = data.filter((item) => {
    return Object.keys(filters).every((key) => {
      const filterKey = filters[key];
      if (Number(filterKey) === 0) {
        return true;
      }

      if (!filterKey) {
        return true;
      }

      const keyToLowerCase = key.toLocaleLowerCase();
      if (keyToLowerCase.includes(DATE) && Array.isArray(filterKey) && filterKey.length === 2) {
        const [startTimestamp, endTimestamp] = filterKey.map((date) => new Date(date).getTime());
        const itemTimestamp = new Date(item[key]).getTime();
        return itemTimestamp >= startTimestamp && itemTimestamp <= endTimestamp;
      }

      return item[key] === filterKey;
    });
  });

  return filteredData;
};
