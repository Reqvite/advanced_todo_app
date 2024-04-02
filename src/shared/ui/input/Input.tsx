import {Box, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps} from '@chakra-ui/react';
import {forwardRef} from 'react';

type InputProps = ChakraInputProps & {
  label: string;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({label, helperText, error, isRequired = false, ...otherProps}, ref) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={Boolean(error)}>
      <FormLabel>{label}</FormLabel>
      <ChakraInput autoComplete="off" {...otherProps} ref={ref} />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      <Box height="5px" marginTop={2}>
        <FormErrorMessage margin={0}>{error}</FormErrorMessage>
      </Box>
    </FormControl>
  );
});
