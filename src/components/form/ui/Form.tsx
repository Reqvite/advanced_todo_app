import {Box, Button, Stack} from '@chakra-ui/react';
import {ReactElement} from 'react';
import {Resolver, useForm} from 'react-hook-form';
import {BlurBox} from '@/shared/ui';
import {renderFormBlock} from '../model/renderFormBlock';
import {FormInputVariants, FormOption} from '../model/types';
import {FormHeader} from './FormHeader';

type Props = {
  heading: string;
  options: FormOption<FormInputVariants>[];
  formValidationSchema?: Resolver<any>;
  defaultValues: {[key: string]: string | number | [] | object};
  onSubmit: (data: object) => void;
};

export const Form = ({heading, options, formValidationSchema, onSubmit, defaultValues}: Props): ReactElement => {
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
          <Button type="submit" variant="primary" fontFamily="heading" w="full" mt={4}>
            Submit
          </Button>
        </Stack>
      </Box>
    </BlurBox>
  );
};
