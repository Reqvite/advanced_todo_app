import {Button, Flex} from '@chakra-ui/react';
import {ReactElement} from 'react';

interface PaginationProps {
  currentPage: number;
  totalItemsCount: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({currentPage, totalItemsCount, onPageChange}: PaginationProps): ReactElement => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalItemsCount;

  const onPageChangeClick = (page: number) => {
    if (page < 1 || page > totalItemsCount) return;
    onPageChange(page);
  };

  return (
    <Flex justify="center" mt={4}>
      <Button onClick={() => onPageChangeClick(currentPage - 1)} disabled={isFirstPage} mr={2}>
        Previous
      </Button>
      {Array.from({length: totalItemsCount}, (_, i) => i + 1).map((page) => (
        <Button key={page} variant={currentPage === page ? 'solid' : 'outline'} onClick={() => onPageChangeClick(page)} mx={1}>
          {page}
        </Button>
      ))}
      <Button onClick={() => onPageChangeClick(currentPage + 1)} disabled={isLastPage} ml={2}>
        Next
      </Button>
    </Flex>
  );
};
