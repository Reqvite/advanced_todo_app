import {ReactNode} from 'react';
import {LabelOptionsI} from '@/shared/types/options';

export enum FilterTypeEnum {
  SELECT = 'Select',
  DATEPICKER = 'DatePicker',
  RANGE_DATEPICKER = 'RangeDatePicker',
  MULTI_SELECT = 'MultiSelect'
}

export enum SearchTypeEnum {
  POPOVER_INPUT = 'PopoverInput'
}

export interface State<T> {
  pageIndex: number;
  pageSize: number;
  rows: T[];
  loading: boolean;
  sortDirection: string;
  sortField: string;
  filters: {[key: string]: string};
  values: {[key: string]: string};
  search: {[key: string]: string};
}
export interface Column<T> {
  header: string;
  accessor: string;
  isTruncated?: boolean;
  width?: string;
  cell?: (value: any, item: T) => ReactNode;
  filter?: {
    placeholder?: string;
    type: FilterTypeEnum;
    options?: LabelOptionsI[];
  };
  search?: {
    type: SearchTypeEnum;
  };
}
