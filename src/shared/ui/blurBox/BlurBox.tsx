import {Box, BoxProps, useColorModeValue} from '@chakra-ui/react';
import {ReactElement, ReactNode} from 'react';

type Props = BoxProps & {
  children: ReactNode;
};

export const BlurBox = (props: Props): ReactElement => {
  const {children, ...otherProps} = props;

  const boxBg = useColorModeValue('secondaryBgColorLightTransparent', 'secondaryBgColorDarkTransparent');
  return (
    <Box padding={5} overflow="hidden" borderRadius="lg" bg={boxBg} css={{backdropFilter: 'blur(8px)'}} {...otherProps}>
      {children}
    </Box>
  );
};
