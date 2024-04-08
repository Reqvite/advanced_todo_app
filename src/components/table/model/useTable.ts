import {useEffect, useReducer} from 'react';
import {applyFilters} from './applyFilters';
import {applySearch} from './applySearch';
import {sortData} from './sortData';
import {initialState, tableReducer} from './tableReducer';

export const useTable = <T extends {_id: string}>({items, defaultPageSizeOptions}: {items: T[]; defaultPageSizeOptions?: number[]}) => {
  const [state, dispatch] = useReducer(tableReducer, {...initialState, rows: items});
  const {pageIndex, pageSize, rows = items, sortDirection, sortField, filters, search} = state;

  const onChangeSort = (key: string): void => {
    const isSameSortKey = key === sortField && sortField !== '';
    const {data: sortedRows, direction} = sortData(key, rows, isSameSortKey ? sortDirection : '');

    dispatch({type: 'SET_SORT_FIELD', payload: key});
    dispatch({type: 'SET_SORT_DIRECTION', payload: direction});
    dispatch({type: 'SET_ROWS', payload: sortedRows});
  };

  const onChangeFilter = (key: string, value: string): void => {
    dispatch({type: 'SET_FILTER', payload: {key, value}});
    dispatch({type: 'SET_PAGE_INDEX', payload: 0});
  };

  const onChangeSearch = (value: string) => {
    dispatch({type: 'SET_SEARCH', payload: value});
    dispatch({type: 'SET_PAGE_INDEX', payload: 0});
  };

  const onResetFilter = (): void => {
    dispatch({type: 'SET_FILTER_DEFAULT'});
    onChangeSearch('');
  };

  const filteredRows = applyFilters<T>(sortField ? sortData(sortField, rows, sortDirection) : {data: items}, filters);
  const searchFilteredRows = applySearch<T>({data: filteredRows}, search);

  useEffect(() => {
    dispatch({type: 'SET_ROWS', payload: items});
  }, [items, dispatch]);

  const allFiltersKeys = {
    ...filters,
    ...(search ? {search} : {}),
    ...(sortDirection ? {sortDirection} : {})
  };

  return {
    rows,
    state,
    filteredRows: searchFilteredRows,
    defaultPageSizeOptions,
    pageIndex,
    pageSize,
    sortDirection,
    sortField,
    search,
    filters: allFiltersKeys,
    dispatch,
    onChangeSort,
    onChangeFilter,
    onResetFilter,
    onChangeSearch
  };
};
