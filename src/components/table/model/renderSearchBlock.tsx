import {LabelOptionsI} from '@/shared/types/options';
import {SearchPopover} from '@/shared/ui';
import {SearchTypeEnum} from './types';

export const renderSearchBlock = (
  filter: {
    type: string;
    options?: LabelOptionsI[];
  },
  accessor: string,
  onChangeFilter: (key: string, value: any) => void
) => {
  switch (filter.type) {
    case SearchTypeEnum.POPOVER_INPUT:
      return <SearchPopover onChange={(value) => onChangeFilter(accessor, value)} />;
    default:
      return null;
  }
};
