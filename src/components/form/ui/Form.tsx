import {Box, Button, Stack} from '@chakra-ui/react';
import {ReactElement} from 'react';
import {Resolver, useForm} from 'react-hook-form';
import {BlurBox} from '@/shared/ui';
import {renderFormBlock} from '../model/renderFormBlock';
import {FormInputVariants, FormOption} from '../model/types';
import {FormHeader} from './FormHeader';

type Props<T> = {
  heading: string;
  options: FormOption<FormInputVariants>[];
  formValidationSchema?: Resolver<any>;
  defaultValues: T;
  onSubmit: (data: T) => void;
  isLoading: boolean;
};

export const Form = <T,>({heading, options, formValidationSchema, onSubmit, defaultValues, isLoading}: Props<T>): ReactElement => {
  const {
    handleSubmit,
    control,
    formState: {errors}
  } = useForm({resolver: formValidationSchema, defaultValues});

  return (
    <BlurBox>
      <FormHeader heading={heading} />
      <Box w="full" as="form" maxW="800px" mt={10} mx="auto" onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4}>
          {options.map((option) => renderFormBlock({option, errors, control}))}
          <Button isLoading={isLoading} isDisabled={isLoading} type="submit" variant="primary" fontFamily="heading" w="full" mt={4}>
            Submit
          </Button>
        </Stack>
      </Box>
    </BlurBox>
  );
};
