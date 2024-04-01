import {Box, FormControl, FormErrorMessage, FormHelperText, FormLabel, SelectFieldProps} from '@chakra-ui/react';
import {Select as ChakraReactSelect} from 'chakra-react-select';
import React from 'react';
import {LabelOptions} from '@/shared/types/options';

type MultiSelectProps = SelectFieldProps & {
  label: string;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  variant?: string;
  options: LabelOptions[];
  placeholder?: string;
};

export const MultiSelect = React.forwardRef<HTMLSelectElement, MultiSelectProps>(
  ({label, helperText, error, isRequired = false, ...otherProps}, ref) => {
    return (
      <FormControl isRequired={isRequired} isInvalid={Boolean(error)}>
        <FormLabel>{label}</FormLabel>
        {/* @ts-expect-error /// */}
        <ChakraReactSelect onChange={onChangeNew} isMulti closeMenuOnSelect={false} {...otherProps} ref={ref} />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        <Box height="5px" marginTop={2}>
          <FormErrorMessage margin={0}>{error}</FormErrorMessage>
        </Box>
      </FormControl>
    );
  }
);
