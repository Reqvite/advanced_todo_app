import {LabelOptions} from '@/shared/types/options';

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

export type FormOption<V extends FormInputVariants> = V extends FormInputVariants.Input
  ? BaseFormOption & {
      variant: FormInputVariants.Input;
    }
  : V extends FormInputVariants.Select
    ? BaseFormOption & {
        variant: FormInputVariants.Select;
        labelOptions: LabelOptions[];
      }
    : V extends FormInputVariants.Datepicker
      ? BaseFormOption & {
          variant: FormInputVariants.Datepicker;
          minDate?: string;
          maxDate?: string;
        }
      : V extends FormInputVariants.MultiSelect
        ? BaseFormOption & {
            variant: FormInputVariants.MultiSelect;
            labelOptions: LabelOptions[];
          }
        : never;
