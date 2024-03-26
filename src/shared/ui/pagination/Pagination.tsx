import {Button, Flex, Text} from '@chakra-ui/react';
import {ReactElement} from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({currentPage, totalPages, onPageChange}: PaginationProps): ReactElement => {
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  const onPageChangeClick = (page: number) => {
    if (page < 0 || page >= totalPages) return;
    onPageChange(page);
  };

  const displayedPage = currentPage + 1;

  return (
    <Flex alignItems="center" gap={4} mt={4}>
      <Button variant="primary" onClick={() => onPageChangeClick(currentPage - 1)} isDisabled={isFirstPage}>
        Previous
      </Button>
      <Text>
        {displayedPage}/{totalPages}
      </Text>
      <Button variant="primary" onClick={() => onPageChangeClick(currentPage + 1)} isDisabled={isLastPage}>
        Next
      </Button>
    </Flex>
  );
};
