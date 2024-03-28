export enum FormInputVariants {
  Input = 'input',
  Select = 'select',
  Datepicker = 'datepicker'
}

interface LabelOptions {
  label: string;
  value: number;
}

export type FormOption<V extends FormInputVariants> = V extends FormInputVariants.Input
  ? {
      variant: FormInputVariants.Input;
      name: string;
      id: string;
    }
  : V extends FormInputVariants.Select
    ? {
        variant: FormInputVariants.Select;
        name: string;
        id: string;
        labelOptions: LabelOptions[];
      }
    : V extends FormInputVariants.Datepicker
      ? {
          variant: FormInputVariants.Datepicker;
          name: string;
          id: string;
        }
      : never;
