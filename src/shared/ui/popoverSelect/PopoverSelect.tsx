import {IconButton, List, ListItem, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger} from '@chakra-ui/react';
import {ReactElement, useState} from 'react';
import {IconType} from 'react-icons';
import {FaFilter} from 'react-icons/fa';
import {LabelOptionsI} from '@/shared/types/options';

interface Props {
  options: LabelOptionsI[];
  onChange: (value: number) => void;
  icon?: IconType;
}

export const PopoverSelect = ({options, onChange, icon: Icon = FaFilter}: Props): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const handleItemClick = (selectedValue: number): void => {
    setSelectedValue(selectedValue);
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div>
      <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <PopoverTrigger>
          <IconButton variant="primary" w="25px" h="25px" minW="25px" aria-label="Settings" icon={<Icon />} onClick={() => setIsOpen(!isOpen)} />
        </PopoverTrigger>
        <PopoverContent maxW="150px">
          <PopoverArrow />
          <PopoverBody>
            <List spacing={3}>
              {options.map((option, index) => (
                <ListItem
                  key={index}
                  onClick={() => handleItemClick(option.value)}
                  cursor="pointer"
                  padding="5px"
                  color="white"
                  borderRadius="10px"
                  _hover={{
                    background: 'accentColorTransparent'
                  }}
                  background={selectedValue === option.value ? 'accentColor' : ''}
                >
                  {option.label}
                </ListItem>
              ))}
            </List>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
};
