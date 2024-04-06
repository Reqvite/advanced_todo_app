import {Tooltip as ChakraTooltip} from '@chakra-ui/tooltip';
import {ReactElement, ReactNode} from 'react';

interface Props {
  children: ReactNode;
  label?: string;
}

export const Tooltip = ({children, label}: Props): ReactElement => {
  return <ChakraTooltip label={label}>{children}</ChakraTooltip>;
};
