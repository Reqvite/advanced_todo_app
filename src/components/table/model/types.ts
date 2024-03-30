export interface Column {
  header: string;
  accessor: string;
  cell?: (value: any, id: string) => any;
}
