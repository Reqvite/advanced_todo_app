import {Box, BoxProps, useColorModeValue, useMediaQuery} from '@chakra-ui/react';
import {AnimatePresence, motion} from 'framer-motion';
import {ReactElement, ReactNode} from 'react';
import {MEDIA_QUERY} from '@/shared/const';

type Props = BoxProps & {
  children: ReactNode;
};

const MotionBox = motion(Box);

export const BlurBox = ({children, ...otherProps}: Props): ReactElement => {
  const [isLargerThan900] = useMediaQuery(MEDIA_QUERY.MIN_WIDTH_TABLET, {
    ssr: false
  });
  const boxBg = useColorModeValue('secondaryBgColorLightTransparent', 'secondaryBgColorDarkTransparent');

  return (
    <AnimatePresence>
      <MotionBox
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        padding={isLargerThan900 ? 5 : 1}
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
