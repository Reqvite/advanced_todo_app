enum Priority {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  CRITICAL = 4
}

enum Tag {
  PERSONAL = 1,
  WORK = 2,
  SHOPPING = 3,
  STUDY = 4
}

interface BaseTaskI {
  _id: string;
  note: string;
  priority: Priority;
  expDate: string;
}

interface TaskI extends BaseTaskI {
  tags: Tag[];
}

interface TaskIWithTagLabel extends BaseTaskI {
  tags: {label: string; value: string}[];
}

export {Priority, Tag, type TaskI, type TaskIWithTagLabel};
