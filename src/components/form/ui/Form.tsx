import {Box, Button, Stack} from '@chakra-ui/react';
import {Resolver, useForm} from 'react-hook-form';
import {BlurBox} from '@/shared/ui';
import {renderFormBlock} from '../model/renderFormBlock';
import {FormInputVariants, FormOption} from '../model/types';
import {FormHeader} from './FormHeader';

type Props = {
  heading: string;
  options: FormOption<FormInputVariants>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formValidationSchema?: Resolver<any>;
};

export const Form = (props: Props) => {
  const {heading, options, formValidationSchema} = props;

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({resolver: formValidationSchema});
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <BlurBox>
      <FormHeader heading={heading} />
      <Box as={'form'} mt={10} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4}>
          {options.map((option) => renderFormBlock({option, register, errors}))}
          <Button type="submit" variant="primary" fontFamily={'heading'} w={'full'} mt={4}>
            Submit
          </Button>
        </Stack>
      </Box>
    </BlurBox>
  );
};
