import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    yellow: {
      // override chakra-ui's default yellow colors
      "50": "#FEFCE6",
      "100": "#FDF8BA",
      "200": "#FBF38D",
      "300": "#FAEE61",
      "400": "#F9EA34",
      "500": "#F7E508",
      "600": "#C6B706",
      "700": "#948905",
      "800": "#635C03",
      "900": "#312E02",
    },
  },
});

export default theme;
