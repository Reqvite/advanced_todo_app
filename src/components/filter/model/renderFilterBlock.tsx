import {ReactElement} from 'react';
import {Control, Controller, FieldErrors, FieldValues, Path} from 'react-hook-form';
import {Input, Select} from '@/shared/ui';
import {FilterInputVariantsEnum, FilterOption} from './types';

type Props<T extends FieldValues> = {
  option: FilterOption<FilterInputVariantsEnum>;
  errors: FieldErrors<T>;
  control: Control<T>;
};

export const renderFilterBlock = <T extends FieldValues>({option, errors, control}: Props<T>): ReactElement => {
  switch (option.variant) {
    case FilterInputVariantsEnum.Input:
      return (
        <Controller
          key={option.accessor}
          control={control}
          name={option.accessor as Path<T>}
          render={({field}) => (
            <Input
              error={Object.keys(errors).includes(option.accessor) ? String(errors[option.accessor]?.message) : ''}
              key={option.accessor}
              label={option.name}
              placeholder={option.name}
              variant="primary"
              {...field}
            />
          )}
        />
      );
    case FilterInputVariantsEnum.Datepicker:
      return (
        <Controller
          key={option.accessor}
          control={control}
          name={option.accessor as Path<T>}
          render={({field}) => (
            <Input
              variant="primary"
              error={Object.keys(errors).includes(option.accessor) ? String(errors[option.accessor]?.message) : ''}
              key={option.accessor}
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
    case FilterInputVariantsEnum.Select:
      return (
        <Controller
          key={option.accessor}
          control={control}
          name={option.accessor as Path<T>}
          render={({field}) => {
            return (
              <Select
                error={Object.keys(errors).includes(option.accessor) ? String(errors[option.accessor]?.message) : ''}
                label={option.name}
                key={option.accessor}
                variant="primary"
                options={option.labelOptions}
                {...field}
              />
            );
          }}
        />
      );
  }
};
