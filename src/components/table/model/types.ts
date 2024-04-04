import {ReactNode} from 'react';

export interface State<T> {
  pageIndex: number;
  pageSize: number;
  data: T[];
  loading: boolean;
  sortDirection: string;
  sortField: string;
}

export interface Column<T> {
  header: string;
  accessor: string;
  cell?: (value: any, item: T) => ReactNode;
}
