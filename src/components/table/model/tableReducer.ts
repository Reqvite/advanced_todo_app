import {ActionI} from '@/shared/types/reducerAction';
import {State} from './types';

const DEFAULT_PAGINATION = [10, 20, 50];
const initialState = {
  pageIndex: 0,
  pageSize: DEFAULT_PAGINATION[0],
  rows: [],
  loading: false,
  sortDirection: '',
  sortField: '',
  filters: {},
  values: {},
  search: ''
};

const tableReducer = <T>(state: State<T>, action: ActionI<any>) => {
  switch (action.type) {
    case 'SET_PAGE_INDEX':
      return {...state, pageIndex: action.payload};
    case 'SET_PAGE_SIZE':
      return {...state, pageSize: action.payload};
    case 'INCREMENT_PAGE_INDEX':
      return {...state, pageIndex: state.pageIndex + 1};
    case 'DECREMENT_PAGE_INDEX':
      return {...state, pageIndex: state.pageIndex - 1};
    case 'SET_ROWS':
      return {...state, rows: action.payload};
    case 'SET_LOADING':
      return {...state, loading: action.payload};
    case 'SET_SORT_DIRECTION':
      return {...state, sortDirection: action.payload};
    case 'SET_SORT_FIELD':
      return {...state, sortField: action.payload};
    case 'SET_FILTER':
      return {...state, filters: {...state.filters, [action.payload.key]: action.payload.value}};
    case 'SET_VALUES':
      return {...state, values: {...state.values, [action.payload.key]: action.payload.value}};
    case 'SET_SEARCH':
      return {...state, search: action.payload};
    case 'SET_VALUES_DEFAULT':
      return {
        ...state,
        values: Object.fromEntries(Object.keys(state.values).map((key) => [key, ''])),
        search: '',
        sortField: '',
        sortDirection: ''
      };
    case 'SET_FILTER_DEFAULT':
      return {
        ...state,
        filters: {},
        search: '',
        sortField: '',
        sortDirection: ''
      };
    default:
      return state;
  }
};

export {initialState, tableReducer};
