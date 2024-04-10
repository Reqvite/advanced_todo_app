import {Drawer as ChakraDrawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay} from '@chakra-ui/react';
import {ReactNode} from 'react';

interface Props {
  isOpen: boolean;
  children?: ReactNode;
  title?: string;
  modalFooter?: ReactNode;
  onClose: () => void;
  onOpen?: () => void;
}

export const Drawer = ({children, isOpen, title = 'Drawer', onClose}: Props) => {
  return (
    <ChakraDrawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{title}</DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
      </DrawerContent>
    </ChakraDrawer>
  );
};
