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
      //   color: mode("white", "gray.900")(props),

      _hover: {
        bg: accentColor,
        borderColor: accentColor
      }
      // _disabled: {
      //   borderColor: mode("gray.200", "transparent")(props),
      //   bg: mode("gray.200", "whiteAlpha.300")(props),
      //   color: mode("gray.500", "whiteAlpha.500")(props),
      // },
    },
    _focusVisible: {
      boxShadow: 'var(--chakra-shadows-mainShadow)'
    }
  }
});

export const checkboxTheme = defineMultiStyleConfig({baseStyle});
