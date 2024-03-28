import {Box, FormControl, FormErrorMessage, FormHelperText, FormLabel, Select as ChakraSelect, SelectFieldProps} from '@chakra-ui/react';
import {UseFormRegisterReturn} from 'react-hook-form';

type SelectProps = SelectFieldProps & {
  label: string;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  register?: UseFormRegisterReturn<string>;
  variant?: string;
};
export const Select = (props: SelectProps) => {
  const {label, helperText, error, isRequired = false, register, ...otherProps} = props;

  return (
    <FormControl isRequired={isRequired} isInvalid={Boolean(error)}>
      <FormLabel>{label}</FormLabel>
      <ChakraSelect {...otherProps} {...register} />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      <Box height="5px" marginTop={2}>
        <FormErrorMessage margin={0}>{error}</FormErrorMessage>
      </Box>
    </FormControl>
  );
};
