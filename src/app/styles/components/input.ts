import {accentColor} from '../const';

export const inputTheme = {
  variants: {
    clear: {
      field: {
        color: accentColor,
        width: '100%',
        display: 'inline-block',
        bg: 'transparent'
      }
    },
    primary: {
      field: {
        color: accentColor,
        width: '100%',
        display: 'inline-block',
        bg: 'transparent',
        border: `2px solid ${accentColor}`
      }
    }
  }
};
