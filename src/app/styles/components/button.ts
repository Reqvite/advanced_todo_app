import {accentColor, accentColorTransparent, mainShadow, successColor} from '../const';

export const buttonTheme = {
  variants: {
    primary: {
      color: 'white',
      border: '2px solid transparent',
      display: 'inline-flex',
      fontWeight: 600,
      bg: accentColor,
      _hover: {
        background: 'transparent',
        border: `2px solid ${accentColor}`,
        color: accentColor,
        _disabled: {
          backgroundColor: `2px solid ${accentColorTransparent}`
        }
      },
      _focusVisible: {
        background: 'transparent',
        border: `2px solid ${accentColor}`,
        color: accentColor,
        boxShadow: 'none'
      },
      cursor: 'pointer'
    },
    secondary: {
      border: `2px solid ${accentColor}`,
      color: accentColor,
      _hover: {
        background: accentColor,
        borderColor: 'transparent',
        color: 'white',
        _disabled: {
          backgroundColor: `2px solid ${accentColorTransparent}`
        }
      },
      _focusVisible: {
        boxShadow: mainShadow
      }
    },
    link: {
      _hover: {
        color: accentColor,
        textDecoration: 'none'
      },
      _focusVisible: {
        boxShadow: mainShadow
      }
    },
    success: {
      border: `2px solid ${successColor}`,
      background: successColor,
      color: 'white',
      _hover: {
        background: successColor,
        borderColor: 'transparent',
        color: 'white'
      },
      _focusVisible: {
        boxShadow: mainShadow
      }
    }
  }
};
