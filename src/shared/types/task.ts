enum PriorityEnum {
  ALL = 0,
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  CRITICAL = 4
}

enum TagEnum {
  ALL = 0,
  PERSONAL = 1,
  WORK = 2,
  SHOPPING = 3,
  STUDY = 4
}

enum StatusEnum {
  ALL = 0,
  COMPLETED = 1,
  NOT_COMPLETED = 2
}

interface BaseTaskI {
  _id: string;
  note: string;
  priority: PriorityEnum;
  expDate: string;
  status: StatusEnum;
}

interface TaskI extends BaseTaskI {
  tags: TagEnum[];
}

interface TaskIWithTagLabel extends BaseTaskI {
  tags: {label: string; value: string}[];
}

export {PriorityEnum, StatusEnum, TagEnum, type TaskI, type TaskIWithTagLabel};
