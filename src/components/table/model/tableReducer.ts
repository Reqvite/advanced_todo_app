import {ActionI} from '@/shared/types/reducerAction';
import {State} from './types';

const DEFAULT_PAGINATION = [10, 20, 50];
const initialState = {
  pageIndex: 0,
  pageSize: DEFAULT_PAGINATION[0],
  data: [],
  loading: false,
  sortDirection: '',
  sortField: ''
};

const tableReducer = <T>(state: State<T>, action: ActionI) => {
  switch (action.type) {
    case 'SET_PAGE_INDEX':
      return {...state, pageIndex: action.payload};
    case 'SET_PAGE_SIZE':
      return {...state, pageSize: action.payload};
    case 'INCREMENT_PAGE_INDEX':
      return {...state, pageIndex: state.pageIndex + 1};
    case 'DECREMENT_PAGE_INDEX':
      return {...state, pageIndex: state.pageIndex - 1};
    case 'SET_DATA':
      return {...state, data: action.payload};
    case 'SET_LOADING':
      return {...state, loading: action.payload};
    case 'SET_SORT_DIRECTION':
      return {...state, sortDirection: action.payload};
    case 'SET_SORT_FIELD':
      return {...state, sortField: action.payload};
    default:
      return state;
  }
};

export {initialState, tableReducer};
