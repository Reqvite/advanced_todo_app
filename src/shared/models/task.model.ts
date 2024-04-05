import {FORMAT_DATES} from '../const';
import {tagOptions} from '../lib/helpers';
import {TaskI} from '../types/task';

export class TaskFormModel {
  public note: string;
  public priority: number;
  public expDate: Date | string;
  public tags: any[];

  constructor(model?: TaskI) {
    const defaultTags = tagOptions.filter((tag) => model?.tags.includes(tag.value)) || [];
    this.note = model?.note || '';
    this.priority = model?.priority || 1;
    this.expDate = model?.expDate ? FORMAT_DATES.MONTH_DATE_YEAR(new Date(model.expDate)) : '';
    this.tags = defaultTags;
  }
}
