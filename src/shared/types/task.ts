enum Priority {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  URGENT = 4
}

enum Tag {
  PERSONAL = 1,
  WORK = 2,
  SHOPPING = 3,
  STUDY = 4
}

interface TaskI {
  _id: string;
  note: string;
  priority: Priority;
  expDate: string;
  tags: Tag[];
}

export {Priority, Tag, type TaskI};
