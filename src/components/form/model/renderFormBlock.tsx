import {FieldValues, UseFormRegister} from 'react-hook-form';
import {Input, Select} from '@/shared/ui';
import {FormInputVariants, FormOption} from './types';

type Props = {
  option: FormOption<FormInputVariants>;
  register: UseFormRegister<FieldValues>;
  errors: {
    [key: string]: {message: string};
  };
};

export const renderFormBlock = ({option, register, errors}: Props) => {
  let options;
  if (option.variant === FormInputVariants.Select) {
    options = option.labelOptions.map((option) => {
      return (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      );
    });
  }

  switch (option.variant) {
    case FormInputVariants.Input:
      return (
        <Input
          error={Object.keys(errors).includes(option.id) ? errors[option.id].message : ''}
          isRequired={option.isRequired}
          key={option.id}
          label={option.name}
          placeholder={option.name}
          variant="primary"
          register={register(option.id)}
        />
      );
    case FormInputVariants.Select:
      return (
        <Select
          error={Object.keys(errors).includes(option.id) ? errors[option.id].message : ''}
          isRequired={option.isRequired}
          label={option.name}
          key={option.id}
          variant="primary"
          register={register(option.id)}
        >
          {options}
        </Select>
      );
    // case FormInputVariants.Datepicker:
    //   return (
    //     <Select isRequired={option.isRequired} label={option.name} key={option.id} variant="primary" register={register(option.id)}>
    //       {options}
    //     </Select>
    //   );
  }
};
