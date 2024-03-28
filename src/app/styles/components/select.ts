import {accentColor} from '../const';

export const selectTheme = {
  variants: {
    primary: {
      field: {
        color: accentColor,
        bg: 'transparent',
        border: `2px solid ${accentColor}`
      }
    },
    clear: {
      field: {
        color: accentColor,
        bg: 'transparent',
        border: `none`,
        padding: '0'
      }
    }
  }
};
