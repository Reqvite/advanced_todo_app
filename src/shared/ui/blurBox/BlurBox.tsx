import {Box, BoxProps, useColorModeValue} from '@chakra-ui/react';
import {AnimatePresence, motion} from 'framer-motion';
import {ReactElement, ReactNode} from 'react';

type Props = BoxProps & {
  children: ReactNode;
};

const MotionBox = motion(Box);

export const BlurBox = ({children, ...otherProps}: Props): ReactElement => {
  const boxBg = useColorModeValue('secondaryBgColorLightTransparent', 'secondaryBgColorDarkTransparent');

  return (
    <AnimatePresence>
      <MotionBox
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        padding={5}
        borderRadius="lg"
        bg={boxBg}
        css={{backdropFilter: 'blur(8px)'}}
        {...otherProps}
      >
        {children}
      </MotionBox>
    </AnimatePresence>
  );
};
