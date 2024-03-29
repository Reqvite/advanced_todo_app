import {Button, Flex, Text} from '@chakra-ui/react';
import {ReactElement, SetStateAction} from 'react';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (callback: SetStateAction<number>) => void;
};

export const Paginator = ({currentPage, totalPages, onPageChange}: Props): ReactElement => {
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;
  const displayedPage = currentPage + 1;

  const handlePreviousClick = (): void => {
    if (!isFirstPage) {
      onPageChange((prevPage) => prevPage - 1);
    }
  };

  const handleNextClick = (): void => {
    if (!isLastPage) {
      onPageChange((prevPage) => prevPage + 1);
    }
  };

  return (
    <Flex alignItems="center" gap={4} mt={4}>
      <Button variant="primary" onClick={handlePreviousClick} isDisabled={isFirstPage}>
        Previous
      </Button>
      <Text>
        {displayedPage}/{totalPages}
      </Text>
      <Button variant="primary" onClick={handleNextClick} isDisabled={isLastPage}>
        Next
      </Button>
    </Flex>
  );
};
