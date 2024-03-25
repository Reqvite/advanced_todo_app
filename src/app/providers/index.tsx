import {ReactElement, ReactNode} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {ChakraProvider} from './ChakraProvider/ChakraProvider';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import {StoreProvider} from './StoreProvider/ui/StoreProvider';

type Props = {
  children: ReactNode;
};

export const Providers = (props: Props): ReactElement => {
  const {children} = props;
  return (
    <StoreProvider>
      <ChakraProvider>
        <BrowserRouter>
          <ErrorBoundary>{children}</ErrorBoundary>
        </BrowserRouter>
      </ChakraProvider>
    </StoreProvider>
  );
};
