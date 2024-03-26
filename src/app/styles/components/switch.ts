import {switchAnatomy} from '@chakra-ui/anatomy';
import {createMultiStyleConfigHelpers} from '@chakra-ui/react';
import {accentColor} from '../const';

const {definePartsStyle, defineMultiStyleConfig} = createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {},
  thumb: {
    bg: 'gray.700'
  },
  track: {
    bg: 'gray.100',
    _checked: {
      bg: accentColor
    }
  }
});

export const switchTheme = defineMultiStyleConfig({baseStyle});
