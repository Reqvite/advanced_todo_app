import {Flex, Stack, Tag, Text, Tooltip, useMediaQuery} from '@chakra-ui/react';
import {tagOptions} from '@/shared/lib/helpers';

interface Props {
  items: number[];
  maxItemsToShow?: number;
}

export const TagList = ({items, maxItemsToShow = 4}: Props) => {
  const [isLargerThan900] = useMediaQuery('(min-width: 900px)');
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
        <Tooltip
          padding={2}
          label={
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
          }
          placement="top"
        >
          <Flex alignItems="center">
            <Text cursor="pointer" textStyle="underline">
              Show all
            </Text>
          </Flex>
        </Tooltip>
      )}
    </Flex>
  );
};
