import {FORMAT_DATES} from '@/shared/const';
import {TagEnum} from '@/shared/types/task';

interface ResolveEnumLabelParamsI {
  key: number[];
  options: Record<number, string>;
  value: string;
}

const DATE = 'date';

const resolveEnumLabel = ({key, options, value}: ResolveEnumLabelParamsI): boolean => {
  const labels = key.map((item) => options[item]);

  return labels.some((item) => item.toLowerCase().includes(value));
};

export const applySearch = <T extends Record<string, any>>({data}: {data: T[]}, value: string) => {
  value = String(value).toLowerCase();
  return data.filter((item) => {
    return Object.keys(item).some((key) => {
      const keyToLowerCase = key.toLocaleLowerCase();

      if (key === 'tags') {
        return resolveEnumLabel({key: item[key], options: TagEnum, value});
      }

      if (keyToLowerCase.includes(DATE)) {
        const keyValue = FORMAT_DATES.MONTH_DATE_YEAR(item[key]);

        return keyValue.toLocaleLowerCase().includes(value);
      }

      if (key !== '_id') {
        const keyValue = String(item[key]).toLowerCase();

        return keyValue.toLocaleLowerCase().includes(value);
      }

      return false;
    });
  });
};
