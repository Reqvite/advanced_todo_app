enum PriorityEnum {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  CRITICAL = 4
}

enum TagEnum {
  PERSONAL = 1,
  WORK = 2,
  SHOPPING = 3,
  STUDY = 4
}

interface BaseTaskI {
  _id: string;
  note: string;
  priority: PriorityEnum;
  expDate: string;
}

interface TaskI extends BaseTaskI {
  tags: TagEnum[];
}

interface TaskIWithTagLabel extends BaseTaskI {
  tags: {label: string; value: string}[];
}

export {PriorityEnum, TagEnum, type TaskI, type TaskIWithTagLabel};
