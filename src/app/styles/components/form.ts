import { activeLabelStyles } from "../const";

export const formTheme = {
  variants: {
    floating: {
      container: {
        _focusWithin: {
          label: {
            ...activeLabelStyles,
          },
        },
        "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
          {
            ...activeLabelStyles,
          },
        label: {
          top: 0,
          left: 0,
          zIndex: 2,
          position: "absolute",
          backgroundColor: "transparent",
          pointerEvents: "none",
          mx: 3,
          px: 1,
          my: 3,
          transformOrigin: "left top",
        },
      },
    },
  },
};
