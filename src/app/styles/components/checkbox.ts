import {checkboxAnatomy} from '@chakra-ui/anatomy';
import {createMultiStyleConfigHelpers} from '@chakra-ui/react';
import {accentColor} from '../const';

const {definePartsStyle, defineMultiStyleConfig} = createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const baseStyle = definePartsStyle({
  control: {
    padding: 2,
    borderRadius: 0,
    borderColor: accentColor,
    _checked: {
      bg: accentColor,
      borderColor: accentColor,
      _hover: {
        bg: accentColor,
        borderColor: accentColor
      }
    },
    _focusVisible: {
      boxShadow: 'var(--chakra-shadows-mainShadow)'
    }
  }
});

export const checkboxTheme = defineMultiStyleConfig({baseStyle});
