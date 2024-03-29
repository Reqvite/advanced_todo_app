import {Box, FormControl, FormErrorMessage, FormHelperText, FormLabel, SelectFieldProps} from '@chakra-ui/react';
import {Select as ChakraReactSelect} from 'chakra-react-select';
import React from 'react';
import {LabelOptions} from '@/shared/types/options';

type SelectProps = SelectFieldProps & {
  label: string;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  variant?: string;
  options: LabelOptions[];
  placeholder?: string;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({label, helperText, error, isRequired = false, ...otherProps}, ref) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={Boolean(error)}>
      <FormLabel>{label}</FormLabel>
      {/* @ts-expect-error /// */}
      <ChakraReactSelect {...otherProps} ref={ref} />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      <Box height="5px" marginTop={2}>
        <FormErrorMessage margin={0}>{error}</FormErrorMessage>
      </Box>
    </FormControl>
  );
});
