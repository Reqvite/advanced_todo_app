interface FiltersI {
  [key: string]: string | number | [string, string];
}

export const applySearch = <T extends Record<string, any>>({data}: {data: T[]}, filters: FiltersI) => {
  const filteredData = data.filter((item) => {
    return Object.keys(filters).every((key) => {
      const filterKey = filters[key];

      if (Number(filterKey) === 0) {
        return true;
      }

      if (!filterKey) {
        return true;
      }

      return item[key].includes(filterKey);
    });
  });

  return filteredData;
};
