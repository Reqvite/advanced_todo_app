import {accentColor} from '../const';

export const inputTheme = {
  variants: {
    clear: {
      field: {
        color: accentColor,
        width: '100%',
        display: 'inline-block',
        my: '0.25rem',
        bg: 'transparent'
      }
    },
    primary: {
      field: {
        color: accentColor,
        width: '100%',
        display: 'inline-block',
        my: '0.25rem',
        bg: 'transparent',
        border: `2px solid ${accentColor}`
      }
    }
  }
};
