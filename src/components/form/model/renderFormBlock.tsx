import {ReactElement} from 'react';
import {Control, Controller, FieldErrors, FieldValues, UseFormRegister} from 'react-hook-form';
import {Input, MultiSelect, Select} from '@/shared/ui';
import {FormInputVariants, FormOption} from './types';

type Props = {
  option: FormOption<FormInputVariants>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  control: Control<FieldValues>;
};

export const renderFormBlock = ({option, register, errors, control}: Props): ReactElement => {
  switch (option.variant) {
    case FormInputVariants.Input:
      return (
        <Input
          error={Object.keys(errors).includes(option.id) ? String(errors[option.id]?.message) : ''}
          isRequired={option.isRequired}
          key={option.id}
          label={option.name}
          placeholder={option.name}
          variant="primary"
          register={register(option.id)}
        />
      );
    case FormInputVariants.Datepicker:
      return (
        <Input
          variant="primary"
          error={Object.keys(errors).includes(option.id) ? String(errors[option.id]?.message) : ''}
          isRequired={option.isRequired}
          key={option.id}
          label={option.name}
          placeholder={option.name}
          type="date"
          min={option.minDate}
          max={option.maxDate}
          register={register(option.id)}
        />
      );
    case FormInputVariants.Select:
      return (
        <Controller
          key={option.id}
          control={control}
          name={option.id}
          render={({field}) => (
            <Select
              error={Object.keys(errors).includes(option.id) ? String(errors[option.id]?.message) : ''}
              isRequired={option.isRequired}
              label={option.name}
              key={option.id}
              variant="primary"
              options={option.labelOptions}
              {...field}
            />
          )}
        />
      );
    case FormInputVariants.MultiSelect:
      return (
        <Controller
          key={option.id}
          control={control}
          name={option.id}
          render={({field: {onChange, onBlur, value, name, ref}}) => (
            <MultiSelect
              variant="primary"
              error={Object.keys(errors).includes(option.id) ? String(errors[option.id]?.message) : ''}
              isRequired={option.isRequired}
              label={option.name}
              options={option.labelOptions}
              name={name}
              ref={ref}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              placeholder={option.name}
            />
          )}
        />
      );
  }
};
