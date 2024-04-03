import {useEffect, useReducer} from 'react';
import {applyFilters} from './applyFilters';
import {applySearch} from './applySearch';
import {sortData} from './sortData';
import {initialState, tableReducer} from './tableReducer';

export const useTable = <T extends {_id: string}>({items, defaultPageSizeOptions}: {items: T[]; defaultPageSizeOptions?: number[]}) => {
  const [state, dispatch] = useReducer(tableReducer, {...initialState, data: items});
  const {pageIndex, pageSize, data = items, sortDirection, sortField, filters, search} = state;

  const onChangeSort = (key: string) => {
    const {data: sortedData, direction} = sortData(key, data);
    dispatch({type: 'SET_SORT_FIELD', payload: key});
    dispatch({type: 'SET_SORT_DIRECTION', payload: direction});
    dispatch({type: 'SET_DATA', payload: sortedData});
  };

  const onChangeFilter = (key: string, value: string) => {
    dispatch({type: 'SET_FILTER', payload: {key, value}});
    dispatch({type: 'SET_PAGE_INDEX', payload: 0});
  };

  const onChangeSearch = (key: string, value: string) => {
    dispatch({type: 'SET_SEARCH', payload: {key, value}});
    dispatch({type: 'SET_PAGE_INDEX', payload: 0});
  };

  const onResetFilter = () => {
    dispatch({type: 'SET_FILTER_DEFAULT'});
  };

  const filteredData = applyFilters<T>(sortField ? sortData(sortField, data) : {data: items}, filters);
  const searchFilteredData = applySearch<T>({data: filteredData}, search);

  useEffect(() => {
    dispatch({type: 'SET_DATA', payload: items});
  }, [items, dispatch]);

  return {
    data,
    state,
    filteredData: searchFilteredData,
    defaultPageSizeOptions,
    pageIndex,
    pageSize,
    sortDirection,
    sortField,
    search,
    dispatch,
    onChangeSort,
    onChangeFilter,
    onResetFilter,
    onChangeSearch
  };
};
