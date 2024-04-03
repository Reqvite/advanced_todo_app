import {LabelOptionsI} from '@/shared/types/options';

export enum FilterInputVariantsEnum {
  Input = 'input',
  Select = 'select',
  Datepicker = 'datepicker'
}

interface FilterFormOption {
  name: string;
  accessor: string;
}

interface FilterOptionVariantMapI {
  [FilterInputVariantsEnum.Input]: {
    variant: FilterInputVariantsEnum.Input;
  };
  [FilterInputVariantsEnum.Select]: {
    variant: FilterInputVariantsEnum.Select;
    labelOptions: LabelOptionsI[];
  };
  [FilterInputVariantsEnum.Datepicker]: {
    variant: FilterInputVariantsEnum.Datepicker;
    minDate?: string;
    maxDate?: string;
  };
}

export type FilterOption<T extends FilterInputVariantsEnum> = FilterFormOption & FilterOptionVariantMapI[T];
