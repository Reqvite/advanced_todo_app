import {Box, FormControl, FormErrorMessage, FormHelperText, FormLabel} from '@chakra-ui/react';
import {GroupBase, Select as ChakraReactSelect, SelectInstance} from 'chakra-react-select';
import React, {LegacyRef} from 'react';
import {LabelOptionsI} from '@/shared/types/options';

type MultiSelectProps = {
  label: string;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  variant?: string;
  options: LabelOptionsI[];
  placeholder?: string;
};

export const MultiSelect = React.forwardRef<HTMLSelectElement, MultiSelectProps>(
  ({label, helperText, error, isRequired = false, ...otherProps}, ref) => {
    return (
      <FormControl isRequired={isRequired} isInvalid={Boolean(error)}>
        <FormLabel>
          {label}
          {isRequired && (
            <Box as="span" color="errorColorLight" ml="3px">
              *
            </Box>
          )}
        </FormLabel>
        <ChakraReactSelect
          selectedOptionColorScheme="gray.500"
          isMulti
          closeMenuOnSelect={false}
          {...otherProps}
          ref={ref as LegacyRef<SelectInstance<LabelOptionsI, true, GroupBase<LabelOptionsI>>>}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        <Box height="5px" marginTop={2}>
          <FormErrorMessage margin={0}>{error}</FormErrorMessage>
        </Box>
      </FormControl>
    );
  }
);
