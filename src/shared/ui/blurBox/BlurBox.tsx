import {Box, BoxProps, useColorModeValue} from '@chakra-ui/react';
import {ReactElement, ReactNode} from 'react';

type Props = BoxProps & {
  children: ReactNode;
};

export const BlurBox = ({children, ...otherProps}: Props): ReactElement => {
  const boxBg = useColorModeValue('secondaryBgColorLightTransparent', 'secondaryBgColorDarkTransparent');

  return (
    <Box padding={5} borderRadius="lg" bg={boxBg} css={{backdropFilter: 'blur(8px)'}} {...otherProps}>
      {children}
    </Box>
  );
};
