import {ReactNode} from 'react';
import {LabelOptionsI} from '@/shared/types/options';

export interface State<T> {
  pageIndex: number;
  pageSize: number;
  data: T[];
  loading: boolean;
  sortDirection: string;
  sortField: string;
  filters: {[key: string]: string};
}
export interface Column<T> {
  header: string;
  accessor: string;
  cell?: (value: any, item: T) => ReactNode;
  filter?: {
    type: string;
    options?: LabelOptionsI[];
  };
}

export enum FilterTypeEnum {
  SELECT = 'Select',
  DATEPICKER = 'DatePicker'
}
