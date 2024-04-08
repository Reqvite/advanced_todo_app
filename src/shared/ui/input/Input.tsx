import {
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputProps as ChakraInputProps
} from '@chakra-ui/react';
import debounce from 'lodash.debounce';
import {ChangeEvent, forwardRef, ReactNode} from 'react';

type InputProps = ChakraInputProps & {
  label?: string;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  leftIcon?: ReactNode;
  readOnly?: boolean;
  debounceTime?: number;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({label, readOnly, helperText, error, isRequired = false, leftIcon, debounceTime, onChange, ...otherProps}, ref) => {
    const onChangeValue = debounceTime
      ? debounce((event: ChangeEvent<HTMLInputElement>) => {
          if (onChange) {
            onChange(event);
          }
        }, debounceTime)
      : onChange;

    return (
      <FormControl isRequired={isRequired} isInvalid={Boolean(error)}>
        <FormLabel>{label}</FormLabel>
        <InputGroup>
          {leftIcon && <InputLeftElement pointerEvents="none" children={leftIcon} />}
          <ChakraInput readOnly={readOnly} autoComplete="off" onChange={onChangeValue} {...otherProps} ref={ref} />
        </InputGroup>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        <Box height="5px" marginTop={2}>
          <FormErrorMessage margin={0}>{error}</FormErrorMessage>
        </Box>
      </FormControl>
    );
  }
);
