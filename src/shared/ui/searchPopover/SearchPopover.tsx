import {Button, ButtonGroup, IconButton} from '@chakra-ui/button';
import {useDisclosure, UseDisclosureReturn} from '@chakra-ui/hooks';
import {Stack} from '@chakra-ui/layout';
import {Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger} from '@chakra-ui/popover';
import {useRef, useState} from 'react';
import {CiSearch} from 'react-icons/ci';
import {Input} from '../input/Input';

interface SearchPopoverProps {
  onChange: (value: string) => void;
}

export const SearchPopover: React.FC<SearchPopoverProps> = ({onChange}) => {
  const {onOpen, onClose, isOpen}: UseDisclosureReturn = useDisclosure();
  const [inputValue, setInputValue] = useState<string>('');

  const firstFieldRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    onChange(inputValue);
    onClose();
  };

  return (
    <Popover isOpen={isOpen} initialFocusRef={firstFieldRef} onOpen={onOpen} onClose={onClose} placement="right" closeOnBlur={false}>
      <PopoverTrigger>
        <IconButton aria-label="Search" w="25px" h="25px" minW="25px" variant={'secondary'} size="sm" icon={<CiSearch />} />
      </PopoverTrigger>
      <PopoverContent p={5}>
        <PopoverArrow />
        <PopoverCloseButton />
        <Stack spacing={4}>
          <Input value={inputValue} onChange={handleChange} variant="primary" label="Search" id="first-name" ref={firstFieldRef} />
          <ButtonGroup display="flex" justifyContent="flex-end">
            <Button onClick={onClose} variant="secondary">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="primary">
              Save
            </Button>
          </ButtonGroup>
        </Stack>
      </PopoverContent>
    </Popover>
  );
};
