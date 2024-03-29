import {TaskI} from '../types/task';

export class TaskFormModel {
  public note: string;
  public priority: string;
  public expDate: string;
  public tags: [];

  constructor(model?: TaskI) {
    this.note = model?.note || '';
    this.priority = model?.priority || '';
    this.expDate = model?.expDate || '';
    this.tags = model?.tags || [];
  }
}
