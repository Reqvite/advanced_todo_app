enum ApiPath {
  TASKS = '/tasks'
}

enum BasePath {
  BY_ID = '/:id',
  EMPTY = '/'
}

const TasksApiPath = {...BasePath};

export {ApiPath, TasksApiPath};
