import {DatePicker, PopoverSelect} from '@/shared/ui';
import {FilterTypeEnum} from './types';

export const renderFilter = (filter: any, accessor: string, onChangeFilter: (key: string, value: any) => void) => {
  switch (filter.type) {
    case FilterTypeEnum.SELECT:
      return <PopoverSelect options={filter.options} onChange={(value) => onChangeFilter(accessor, value)} />;
    case FilterTypeEnum.DATEPICKER:
      return <DatePicker showInput={false} onDateSelect={(value) => onChangeFilter(accessor, value)} />;
    case FilterTypeEnum.RANGE_DATEPICKER:
      return <DatePicker isRangePicker showInput={false} onDateSelect={(value) => onChangeFilter(accessor, value)} />;
    default:
      return null;
  }
};
