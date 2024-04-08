import {ReactElement} from 'react';
import {Control, Controller, FieldErrors, FieldValues, Path} from 'react-hook-form';
import {DatePicker, Input, MultiSelect, Select} from '@/shared/ui';
import {FormInputVariantsEnum, FormOption} from './types';

type Props<T extends FieldValues> = {
  option: FormOption<FormInputVariantsEnum>;
  errors: FieldErrors<T>;
  control: Control<T>;
};

export const renderFormBlock = <T extends FieldValues>({option, errors, control}: Props<T>): ReactElement => {
  switch (option.variant) {
    case FormInputVariantsEnum.Input:
      return (
        <Controller
          key={option.id}
          control={control}
          name={option.id as Path<T>}
          render={({field}) => (
            <Input
              error={Object.keys(errors).includes(option.id) ? String(errors[option.id]?.message) : ''}
              key={option.id}
              label={option.name}
              placeholder={option.name}
              variant="primary"
              {...field}
            />
          )}
        />
      );
    case FormInputVariantsEnum.Datepicker:
      return (
        <Controller
          key={option.id}
          control={control}
          name={option.id as Path<T>}
          render={({field}) => (
            <DatePicker
              error={Object.keys(errors).includes(option.id) ? String(errors[option.id]?.message) : ''}
              label={option.name}
              minDate={option.minDate && option.minDate}
              key={option.id}
              {...field}
            />
          )}
        />
      );
    case FormInputVariantsEnum.Select:
      return (
        <Controller
          key={option.id}
          control={control}
          name={option.id as Path<T>}
          render={({field}) => {
            return (
              <Select
                error={Object.keys(errors).includes(option.id) ? String(errors[option.id]?.message) : ''}
                label={option.name}
                key={option.id}
                variant="primary"
                options={option.labelOptions}
                {...field}
              />
            );
          }}
        />
      );
    case FormInputVariantsEnum.MultiSelect:
      return (
        <Controller
          key={option.id}
          control={control}
          name={option.id as Path<T>}
          render={({field}) => (
            <MultiSelect
              variant="primary"
              error={Object.keys(errors).includes(option.id) ? String(errors[option.id]?.message) : ''}
              label={option.name}
              options={option.labelOptions}
              placeholder={option.name}
              {...field}
            />
          )}
        />
      );
  }
};
