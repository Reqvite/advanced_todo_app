import {actions} from './todo.slice.js';

const allActions = {
  ...actions
};

export {allActions as actions};
export {reducer} from './todo.slice.js';
