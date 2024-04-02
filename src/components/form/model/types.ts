import {LabelOptionsI} from '@/shared/types/options';

export enum FormInputVariants {
  Input = 'input',
  Select = 'select',
  MultiSelect = 'multi-select',
  Datepicker = 'datepicker'
}

interface BaseFormOption {
  name: string;
  id: string;
  isRequired?: boolean;
}

type FormOptionVariantMap = {
  [FormInputVariants.Input]: {
    variant: FormInputVariants.Input;
  };
  [FormInputVariants.Select]: {
    variant: FormInputVariants.Select;
    labelOptions: LabelOptionsI[];
  };
  [FormInputVariants.Datepicker]: {
    variant: FormInputVariants.Datepicker;
    minDate?: string;
    maxDate?: string;
  };
  [FormInputVariants.MultiSelect]: {
    variant: FormInputVariants.MultiSelect;
    labelOptions: LabelOptionsI[];
  };
};

export type FormOption<T extends FormInputVariants> = BaseFormOption & FormOptionVariantMap[T];
