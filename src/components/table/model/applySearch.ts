export const applySearch = <T extends Record<string, any>>({data}: {data: T[]}, value: string) => {
  value = String(value).toLowerCase();
  return data.filter((o) => {
    return Object.keys(o).some((key) => {
      const keyValue = String(o[key]).toLowerCase();
      return key.toLowerCase().includes(value) || keyValue.includes(value);
    });
  });
};
