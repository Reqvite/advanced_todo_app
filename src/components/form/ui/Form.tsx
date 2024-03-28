import {Box, Button, Stack} from '@chakra-ui/react';
import {useForm} from 'react-hook-form';
import {BlurBox} from '@/shared/ui';
import {renderFormBlock} from '../model/renderFormBlock';
import {FormInputVariants, FormOption} from '../model/types';
import {FormHeader} from './FormHeader';

type Props = {
  heading: string;
  options: FormOption<FormInputVariants>[];
};

export const Form = (props: Props) => {
  const {heading, options} = props;

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <BlurBox>
      <FormHeader heading={heading} />

      <Box as={'form'} mt={10} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4}>
          {options.map(
            (option) => renderFormBlock(option, register) // Pass register function from React Hook Form
          )}
          <Box h={'auto'} minH={10} mt={2}>
            {/* {errors && <Text color={'var(--chakra-colors-errorColorLight)'}>{errors}</Text>} */}
          </Box>
          <Button type="submit" variant="pr" fontFamily={'heading'} w={'full'} mt={4}>
            Submit
          </Button>
        </Stack>
      </Box>
    </BlurBox>
  );
};
