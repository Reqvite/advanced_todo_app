import {Center, Spinner} from '@chakra-ui/react';

type Props = {
  fullHeight?: boolean;
};

export const Loader = ({fullHeight}: Props) => {
  return (
    <Center h={fullHeight ? '100vh' : ''}>
      <Spinner color="accentColor" />
    </Center>
  );
};
