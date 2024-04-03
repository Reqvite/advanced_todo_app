import {FilterOption} from './types';

export const useFilter = <T>(items: T[], options: FilterOption<T>): T[] => {
  // Apply filters to items
  let filteredItems = [...items];

  for (const option in options) {
    if (options.hasOwnProperty(option)) {
      const filterFunction = options[option];
      filteredItems = filteredItems.filter(filterFunction);
    }
  }

  return filteredItems;
};
