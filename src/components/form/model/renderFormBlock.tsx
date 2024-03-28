import {Input, Select} from '@chakra-ui/react';
import {FormInputVariants, FormOption} from './types';

export const renderFormBlock = (option: FormOption<FormInputVariants>, register: any) => {
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
      return <Input key={option.id} placeholder={option.name} variant="primary" {...register(option.id)} />;
    case FormInputVariants.Select:
      return (
        <Select key={option.id} variant="primary" {...register(option.id)}>
          {options}
        </Select>
      );
    case FormInputVariants.Datepicker:
      return (
        <Select key={option.id} variant="primary" {...register(option.id)}>
          {options}
        </Select>
      );
  }
};
