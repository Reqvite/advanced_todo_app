import {switchAnatomy} from '@chakra-ui/anatomy';
import {createMultiStyleConfigHelpers} from '@chakra-ui/react';
import {errorColorLight, successColor} from '../const';

const {definePartsStyle, defineMultiStyleConfig} = createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {},
  thumb: {
    bg: 'gray.700'
  },
  track: {
    bg: errorColorLight,
    _checked: {
      bg: successColor
    }
  }
});

export const switchTheme = defineMultiStyleConfig({baseStyle});
