import {ReactNode} from 'react';

export interface State<T> {
  pageIndex: number;
  pageSize: number;
  data: T[];
  loading: boolean;
  sortDirection: string;
  sortField: string;
}

export interface Column {
  header: string;
  accessor: string;
  cell?: (value: any, id: string) => ReactNode;
}
