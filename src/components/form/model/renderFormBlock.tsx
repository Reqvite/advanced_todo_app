import {ReactElement} from 'react';
import {Control, Controller, FieldErrors, FieldValues} from 'react-hook-form';
import {Input, MultiSelect, Select} from '@/shared/ui';
import {FormInputVariants, FormOption} from './types';

type Props = {
  option: FormOption<FormInputVariants>;
  errors: FieldErrors<FieldValues>;
  control: Control<FieldValues>;
};

export const renderFormBlock = ({option, errors, control}: Props): ReactElement => {
  switch (option.variant) {
    case FormInputVariants.Input:
      return (
        <Controller
          key={option.id}
          control={control}
          name={option.id}
          render={({field}) => (
            <Input
              error={Object.keys(errors).includes(option.id) ? String(errors[option.id]?.message) : ''}
              isRequired={option.isRequired}
              key={option.id}
              label={option.name}
              placeholder={option.name}
              variant="primary"
              {...field}
            />
          )}
        />
      );
    case FormInputVariants.Datepicker:
      return (
        <Controller
          key={option.id}
          control={control}
          name={option.id}
          render={({field}) => (
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
              {...field}
            />
          )}
        />
      );
    case FormInputVariants.Select:
      return (
        <Controller
          key={option.id}
          control={control}
          name={option.id}
          render={({field}) => {
            return (
              <Select
                error={Object.keys(errors).includes(option.id) ? String(errors[option.id]?.message) : ''}
                isRequired={option.isRequired}
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
    case FormInputVariants.MultiSelect:
      return (
        <Controller
          key={option.id}
          control={control}
          name={option.id}
          render={({field}) => (
            <MultiSelect
              variant="primary"
              error={Object.keys(errors).includes(option.id) ? String(errors[option.id]?.message) : ''}
              isRequired={option.isRequired}
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
