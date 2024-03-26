enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

enum Tag {
  PERSONAL = 'personal',
  WORK = 'work',
  SHOPPING = 'shopping',
  STUDY = 'study'
}

interface TodoI {
  _id: string;
  note: string;
  priority: string;
  expDate: string;
  tags: string[];
}

export {Priority, Tag, type TodoI};
