enum ApiPathEnum {
  TASKS = '/tasks'
}

enum BasePathEnum {
  BY_ID = '/:id',
  EMPTY = '/'
}

const TasksApiPath = {...BasePathEnum};

export {ApiPathEnum, TasksApiPath};
