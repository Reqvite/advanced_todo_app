import {Box, Flex} from '@chakra-ui/react';
import {ReactElement} from 'react';
import {DefaultValues, FieldValues, useForm} from 'react-hook-form';
import {renderFilterBlock} from '../model/renderFilterBlock';
import {FilterInputVariantsEnum, FilterOption} from '../model/types';

type Props<T> = {
  heading: string;
  options: FilterOption<FilterInputVariantsEnum>[];
  defaultValues: T;
  onChange: (data: T) => void;
  data: T;
};

export const Filter = <T extends FieldValues>({options, onChange, defaultValues}: Props<T>): ReactElement => {
  const {
    handleSubmit,
    control,
    formState: {errors}
  } = useForm<T>({defaultValues: defaultValues as DefaultValues<T>});

  return (
    <Box as="form" p={4} borderWidth="1px" borderRadius="md" onChange={handleSubmit(onChange)}>
      <Flex>{options.map((option) => renderFilterBlock<T>({option, errors, control}))}</Flex>
    </Box>
  );
};
