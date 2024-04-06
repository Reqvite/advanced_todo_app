import {Box, Button, Stack} from '@chakra-ui/react';
import {ReactElement} from 'react';
import {DefaultValues, FieldValues, Resolver, useForm} from 'react-hook-form';
import {BlurBox} from '@/shared/ui';
import {renderFormBlock} from '../model/renderFormBlock';
import {FormInputVariantsEnum, FormOption} from '../model/types';
import {FormHeader} from './FormHeader';

type Props<T> = {
  heading: string;
  options: FormOption<FormInputVariantsEnum>[];
  formValidationSchema?: Resolver<any>;
  defaultValues: T;
  onSubmit: (data: T) => void;
  isLoading: boolean;
};

export const Form = <T extends FieldValues>({heading, options, formValidationSchema, onSubmit, defaultValues, isLoading}: Props<T>): ReactElement => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: {errors}
  } = useForm<T>({resolver: formValidationSchema, defaultValues: defaultValues as DefaultValues<T>});

  const handleFormSubmit = handleSubmit(() => {
    onSubmit(getValues());
  });

  return (
    <BlurBox>
      <FormHeader heading={heading} />
      <Box w="full" as="form" maxW="800px" mt={10} mx="auto" onSubmit={handleFormSubmit}>
        <Stack gap={4}>
          {options.map((option) => renderFormBlock<T>({option, errors, control}))}
          <Button isLoading={isLoading} isDisabled={isLoading} type="submit" variant="primary" fontFamily="heading" w="full" mt={4}>
            Submit
          </Button>
        </Stack>
      </Box>
    </BlurBox>
  );
};
