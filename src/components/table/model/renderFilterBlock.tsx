import {Box} from '@chakra-ui/react';
import {Select} from 'chakra-react-select';
import {FORMAT_DATES} from '@/shared/const';
import {LabelOptionsI} from '@/shared/types/options';
import {DatePicker} from '@/shared/ui';
import {FilterTypeEnum} from './types';

export const renderFilterBlock = (
  filter: {
    placeholder?: string;
    type: string;
    options?: LabelOptionsI[];
  },
  accessor: string,
  onChangeFilter: (key: string, value: any, type: string) => void,
  value?: any
) => {
  switch (filter.type) {
    case FilterTypeEnum.MULTI_SELECT:
      return (
        filter?.options && (
          <Box maxW="350px" width="full">
            <Select
              isMulti
              variant="primary"
              placeholder={filter.placeholder}
              options={filter.options}
              value={value}
              onChange={(value) => onChangeFilter(accessor, value, filter.type)}
            />
          </Box>
        )
      );
    case FilterTypeEnum.DATEPICKER:
      return <DatePicker showInput={false} onChange={(value) => onChangeFilter(accessor, value, filter.type)} />;
    case FilterTypeEnum.RANGE_DATEPICKER:
      return (
        <Box maxW="250px" width="full">
          <DatePicker
            value={Array.isArray(value) ? value?.map((date) => FORMAT_DATES.MONTH_DATE_YEAR(date)).join(' - ') : ''}
            isRangePicker
            withError={false}
            onChange={(value) => onChangeFilter(accessor, value, filter.type)}
          />
        </Box>
      );
    default:
      return null;
  }
};
