import {Flex, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Stack, Tag, Text, useMediaQuery} from '@chakra-ui/react';
import {MEDIA_QUERY} from '@/shared/const';
import {tagOptions} from '@/shared/lib/helpers';

interface Props {
  items: number[];
  maxItemsToShow?: number;
}

export const TagList = ({items, maxItemsToShow = 4}: Props) => {
  const [isLargerThan900] = useMediaQuery(MEDIA_QUERY.MIN_WIDTH_TABLET, {
    ssr: false
  });
  const displayedItemsCount = isLargerThan900 ? maxItemsToShow : 0;
  const truncatedItems = items.slice(0, displayedItemsCount);
  const hasMoreItems = items.length > displayedItemsCount;

  return (
    <Flex gap={1}>
      {truncatedItems.map((tag, index) => (
        <Tag
          key={index}
          variant="solid"
          colorScheme="teal"
          padding={{base: '3px', sm: '3px', md: '3px', lg: '3px', xl: '5px'}}
          fontSize={{base: '8px', sm: '8px', md: '8px', lg: '12px', xl: '14px'}}
        >
          {tagOptions.find((option) => option.value === tag)?.label}
        </Tag>
      ))}
      {hasMoreItems && (
        <Popover placement="top">
          <PopoverTrigger>
            <Flex alignItems="center" cursor="pointer">
              <Text textStyle="underline">Show</Text>
            </Flex>
          </PopoverTrigger>
          <PopoverContent maxW={70}>
            <PopoverArrow />
            <PopoverBody>
              <Stack gap={1}>
                {items.map((tag) => (
                  <Tag
                    key={tag}
                    variant="solid"
                    colorScheme="teal"
                    padding={{base: '3px', sm: '3px', md: '3px', lg: '3px', xl: '5px'}}
                    fontSize={{base: '8px', sm: '8px', md: '8px', lg: '12px', xl: '14px'}}
                  >
                    {tagOptions.find((option) => option.value === tag)?.label}
                  </Tag>
                ))}
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      )}
    </Flex>
  );
};
