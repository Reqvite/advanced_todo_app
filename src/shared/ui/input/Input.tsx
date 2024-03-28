import {Box, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps} from '@chakra-ui/react';
import {ReactElement} from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';

type InputProps = ChakraInputProps & {
  label: string;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  register?: UseFormRegisterReturn<string>;
};
export const Input = (props: InputProps): ReactElement => {
  const {label, helperText, error, isRequired = false, register, ...otherProps} = props;

  return (
    <FormControl isRequired={isRequired} isInvalid={Boolean(error)}>
      <FormLabel>{label}</FormLabel>
      <ChakraInput {...otherProps} {...register} />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      <Box height="5px" marginTop={2}>
        <FormErrorMessage margin={0}>{error}</FormErrorMessage>
      </Box>
    </FormControl>
  );
};
