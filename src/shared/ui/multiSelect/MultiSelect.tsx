import {Box, FormControl, FormErrorMessage, FormHelperText, FormLabel, SelectFieldProps} from '@chakra-ui/react';
import {Select as ChakraReactSelect} from 'chakra-react-select';
import React from 'react';
import {LabelOptionsI} from '@/shared/types/options';

type MultiSelectProps = SelectFieldProps & {
  label: string;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  variant?: string;
  options: LabelOptionsI[];
  placeholder?: string;
  customRequired?: boolean;
};

export const MultiSelect = React.forwardRef<HTMLSelectElement, MultiSelectProps>(
  ({label, helperText, error, isRequired = false, customRequired, ...otherProps}, ref) => {
    return (
      <FormControl isRequired={isRequired} isInvalid={Boolean(error)}>
        <FormLabel>
          {label}
          {customRequired && (
            <Box as="span" color="errorColorLight" ml="3px">
              *
            </Box>
          )}
        </FormLabel>
        {/* @ts-expect-error /// */}
        <ChakraReactSelect isMulti closeMenuOnSelect={false} {...otherProps} ref={ref} />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        <Box height="5px" marginTop={2}>
          <FormErrorMessage margin={0}>{error}</FormErrorMessage>
        </Box>
      </FormControl>
    );
  }
);
