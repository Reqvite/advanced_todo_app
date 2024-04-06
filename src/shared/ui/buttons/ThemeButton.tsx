import {IconButton, useColorMode, useColorModeValue} from '@chakra-ui/react';
import {AnimatePresence, motion} from 'framer-motion';
import {FC} from 'react';
import {BiSolidSun} from 'react-icons/bi';
import {BsFillMoonStarsFill} from 'react-icons/bs';

export const ThemeButton: FC = () => {
  const {toggleColorMode} = useColorMode();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={useColorModeValue('light', 'dark')}
        initial={{y: -20, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        exit={{y: 10, opacity: 0}}
        transition={{duration: 0.2}}
        whileHover={{scale: 1.05}}
      >
        <IconButton
          aria-label="Toggle theme"
          bg={useColorModeValue('accentColor', 'yellow.500')}
          icon={useColorModeValue(<BsFillMoonStarsFill />, <BiSolidSun />)}
          onClick={toggleColorMode}
          variant="disabled"
        />
      </motion.div>
    </AnimatePresence>
  );
};
