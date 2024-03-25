import { ChakraProvider as Chakra } from "@chakra-ui/react";
import { ReactElement, ReactNode } from "react";

import { getTheme } from "@/app/styles/theme";

type Props = {
  children: ReactNode;
};

export const ChakraProvider = (props: Props): ReactElement => {
  const { children } = props;
  const theme = getTheme("dark");
  return <Chakra theme={theme}>{children}</Chakra>;
};
