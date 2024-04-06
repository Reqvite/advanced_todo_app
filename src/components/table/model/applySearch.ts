import {TagEnum} from '@/shared/types/task';

interface ResolveEnumLabelParamsI {
  key: number[];
  options: Record<number, string>;
  value: string;
}

const resolveEnumLabel = ({key, options, value}: ResolveEnumLabelParamsI): boolean => {
  const labels = key.map((item) => options[item]);

  return labels.some((item) => item.toLowerCase().includes(value));
};

export const applySearch = <T extends Record<string, any>>({data}: {data: T[]}, value: string) => {
  value = String(value).toLowerCase();
  return data.filter((item) => {
    return Object.keys(item).some((key) => {
      if (key === 'tags') {
        return resolveEnumLabel({key: item[key], options: TagEnum, value});
      }

      if (key !== '_id') {
        const keyValue = String(item[key]).toLowerCase().replace(/\s/g, '');

        return key.toLowerCase().includes(value) || keyValue.includes(value.replace(/\s/g, ''));
      }

      return false;
    });
  });
};
