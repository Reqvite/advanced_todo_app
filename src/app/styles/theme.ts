import {extendTheme, Theme, ThemeConfig} from '@chakra-ui/react';
import {mode} from '@chakra-ui/theme-tools';
import {buttonTheme, checkboxTheme, formTheme, inputTheme, selectTheme} from './components';
import {iconButtonTheme} from './components/iconButton';
import {switchTheme} from './components/switch';
import {accentColor, accentColorTransparentDarker} from './const';

type ColorModeType = 'light' | 'dark';

export const getTheme = (colorMode: ColorModeType): ThemeConfig => {
  return extendTheme({
    config: {
      initialColorMode: colorMode,
      useSystemColorMode: true
    },
    styles: {
      global: (props: Theme) => ({
        body: {
          fontFamily: 'body',
          color: mode('#3D4D54', '#ffffff')(props),
          bgGradient: mode('#ffffff', 'linear(to-br, #202023, #202023, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8), rgba(0, 0, 0))')(props),
          minHeight: '100vh'
        }
      })
    },
    colors: {
      mainBgColorLight: '#ffffff',
      secondaryBgColorLight: '#f5f5f5',
      secondaryBgColorLightTransparent: '#f5f5f560',
      mainBgColorDark: '#202023',
      secondaryBgColorDark: '#282828',
      secondaryBgColorDarkTransparent: '#28282860',
      mainColorLight: '#3D4D54',
      mainColorDark: '#ffffff',
      errorColorLight: '#F56565',
      errorColorDark: '#E53E3E',
      successColorLight: '#48BB78',
      successColorDark: '#2F855A',
      accentColor: 'rgba(144, 144, 194)',
      accentColorTransparent: 'rgba(144, 144, 194, 0.59)',
      accentColorTransparentDarker: 'rgba(144, 144, 194, 0.30)',
      accentColorTransparentDarkest: 'rgba(144, 144, 194, 0.1)'
    },
    layerStyles: {
      primary: {
        bgGradient: 'linear(to-r, rgba(144, 144, 194),gray)'
      }
    },
    shadows: {
      mainShadow: `0 0 0 3px ${accentColorTransparentDarker}`
    },
    borders: {
      borderMain: `2px solid ${accentColor}`,
      borderSecondary: '1px #2D3748 solid'
    },
    sizes: {
      headerHeight: '75px',
      drawerFooterHeight: '113px',
      drawerWidth: '380px'
    },
    space: {
      bs: '1.5rem',
      md: '3rem',
      lg: '4rem'
    },
    zIndices: {
      navbar: 100,
      drawer: 101,
      drawerFooter: 102
    },
    components: {
      Button: buttonTheme,
      Form: formTheme,
      Input: inputTheme,
      Checkbox: checkboxTheme,
      Select: selectTheme,
      Switch: switchTheme,
      IconButton: iconButtonTheme
    }
  });
};
