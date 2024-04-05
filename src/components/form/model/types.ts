import {LabelOptionsI} from '@/shared/types/options';

export enum FormInputVariantsEnum {
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

interface FormOptionVariantMapI {
  [FormInputVariantsEnum.Input]: {
    variant: FormInputVariantsEnum.Input;
  };
  [FormInputVariantsEnum.Select]: {
    variant: FormInputVariantsEnum.Select;
    labelOptions: LabelOptionsI[];
  };
  [FormInputVariantsEnum.Datepicker]: {
    variant: FormInputVariantsEnum.Datepicker;
    minDate?: string;
    maxDate?: string;
  };
  [FormInputVariantsEnum.MultiSelect]: {
    variant: FormInputVariantsEnum.MultiSelect;
    labelOptions: LabelOptionsI[];
  };
}

export type FormOption<T extends FormInputVariantsEnum> = BaseFormOption & FormOptionVariantMapI[T];
