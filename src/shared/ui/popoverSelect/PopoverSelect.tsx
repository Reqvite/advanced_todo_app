import {
  IconButton,
  List,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useColorModeValue,
  useMediaQuery
} from '@chakra-ui/react';
import {ReactElement, useCallback, useState} from 'react';
import {IconType} from 'react-icons';
import {FaFilter} from 'react-icons/fa';
import {MEDIA_QUERY} from '@/shared/const';
import {LabelOptionsI} from '@/shared/types/options';

interface Props {
  options: LabelOptionsI[];
  onChange: (value: number) => void;
  icon?: IconType;
}

export const PopoverSelect = ({options, onChange, icon: Icon = FaFilter}: Props): ReactElement => {
  const [isLargerThan900] = useMediaQuery(MEDIA_QUERY.MIN_WIDTH_TABLET);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const textColor = useColorModeValue('black', 'white');
  const buttonSize = isLargerThan900 ? '25px' : '18px';
  const iconSize = isLargerThan900 ? 13 : 10;

  const handleItemClick = useCallback(
    (selectedValue: number): void => {
      setSelectedValue(selectedValue);
      onChange(selectedValue);
      setIsOpen(false);
    },
    [onChange]
  );

  return (
    <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <PopoverTrigger>
        <IconButton
          variant="primary"
          w={buttonSize}
          h={buttonSize}
          minW={buttonSize}
          aria-label="Settings"
          icon={<Icon size={iconSize} />}
          onClick={() => setIsOpen(!isOpen)}
        />
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
                color={textColor}
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
  );
};
