import {Box, FormControl, FormErrorMessage, FormHelperText, FormLabel, Select as ChakraReactSelect, SelectFieldProps} from '@chakra-ui/react';
import React from 'react';
import {LabelOptionsI} from '@/shared/types/options';

type SelectProps = SelectFieldProps & {
  label?: string;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  variant?: string;
  options: LabelOptionsI[];
  placeholder?: string;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({label, helperText, error, onChange, isRequired = false, value, options, ...otherProps}, ref) => {
    return (
      <FormControl isInvalid={Boolean(error)}>
        <FormLabel>
          {label}
          {isRequired && (
            <Box as="span" color="errorColorLight" ml="3px">
              *
            </Box>
          )}
        </FormLabel>
        <ChakraReactSelect {...otherProps} ref={ref} value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label as string}
            </option>
          ))}
        </ChakraReactSelect>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        <Box height="5px" marginTop={2}>
          <FormErrorMessage margin={0}>{error}</FormErrorMessage>
        </Box>
      </FormControl>
    );
  }
);
