import {ReactNode} from 'react';
import {LabelOptionsI} from '@/shared/types/options';

export enum FilterTypeEnum {
  SELECT = 'Select',
  DATEPICKER = 'DatePicker',
  RANGE_DATEPICKER = 'RangeDatePicker'
}

export enum SearchTypeEnum {
  POPOVER_INPUT = 'PopoverInput'
}

export interface State<T> {
  pageIndex: number;
  pageSize: number;
  data: T[];
  loading: boolean;
  sortDirection: string;
  sortField: string;
  filters: {[key: string]: string};
  search: {[key: string]: string};
}
export interface Column<T> {
  header: string;
  accessor: string;
  cell?: (value: any, item: T) => ReactNode;
  filter?: {
    type: FilterTypeEnum;
    options?: LabelOptionsI[];
  };
  search?: {
    type: SearchTypeEnum;
  };
}
