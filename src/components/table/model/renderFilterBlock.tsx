import {LabelOptionsI} from '@/shared/types/options';
import {DatePicker, PopoverSelect} from '@/shared/ui';
import {FilterTypeEnum} from './types';

export const renderFilterBlock = (
  filter: {
    type: string;
    options?: LabelOptionsI[];
  },
  accessor: string,
  onChangeFilter: (key: string, value: any) => void
) => {
  switch (filter.type) {
    case FilterTypeEnum.SELECT:
      return filter?.options && <PopoverSelect options={filter.options} onChange={(value) => onChangeFilter(accessor, value)} />;
    case FilterTypeEnum.DATEPICKER:
      return <DatePicker showInput={false} onChange={(value) => onChangeFilter(accessor, value)} />;
    case FilterTypeEnum.RANGE_DATEPICKER:
      return <DatePicker isRangePicker showInput={false} onChange={(value) => onChangeFilter(accessor, value)} />;
    default:
      return null;
  }
};
