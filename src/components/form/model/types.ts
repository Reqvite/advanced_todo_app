export enum FormInputVariants {
  Input = 'input',
  Select = 'select',
  Datepicker = 'datepicker'
}

interface LabelOptions {
  label: string;
  value: number;
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
        }
      : never;
