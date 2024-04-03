export const applyFilters = (data, filters) => {
  const filteredData = data.filter((item) => {
    return Object.keys(filters).every((key) => {
      if (Number(filters[key]) === 0) {
        return true;
      }

      if (!filters[key]) {
        return true;
      }

      if (key === 'expDate' && Array.isArray(filters[key]) && filters[key].length === 2) {
        const [startTimestamp, endTimestamp] = filters[key].map((date) => new Date(date).getTime());
        const itemTimestamp = new Date(item[key]).getTime();
        return itemTimestamp >= startTimestamp && itemTimestamp <= endTimestamp;
      }

      return item[key] === +filters[key];
    });
  });

  return filteredData;
};
