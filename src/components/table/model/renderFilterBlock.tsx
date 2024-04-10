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
          <Select
            chakraStyles={{
              control: (provided) => ({
                ...provided,
                height: '42px'
              }),
              container: (provided) => ({
                ...provided,
                height: '40px'
              }),
              valueContainer: (provided) => ({
                ...provided,

                height: '40px',
                overflow: 'auto'
              }),
              multiValue: (provided) => ({
                ...provided,
                padding: 1,
                fontSize: '12px'
              }),
              multiValueLabel: (provided) => ({
                ...provided,
                padding: 0
              })
            }}
            variant="primary"
            isMulti
            placeholder={filter.placeholder}
            options={filter.options}
            value={value}
            onChange={(value) => onChangeFilter(accessor, value, filter.type)}
          />
        )
      );
    case FilterTypeEnum.DATEPICKER:
      return <DatePicker showInput={false} onChange={(value) => onChangeFilter(accessor, value, filter.type)} />;
    case FilterTypeEnum.RANGE_DATEPICKER:
      return (
        <DatePicker
          value={Array.isArray(value) ? value?.map((date) => FORMAT_DATES.MONTH_DATE_YEAR(date)).join(' - ') : ''}
          isRangePicker
          withError={false}
          onChange={(value) => onChangeFilter(accessor, value, filter.type)}
        />
      );
    default:
      return null;
  }
};
