import {Button, Flex, Text} from '@chakra-ui/react';
import {ReactElement} from 'react';
import {ActionI} from '@/shared/types/reducerAction';

type Props = {
  currentPage: number;
  totalPages: number;
  dispatch: ({type}: ActionI<number>) => void;
};

export const Paginator = ({currentPage, totalPages, dispatch}: Props): ReactElement => {
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;
  const displayedPage = currentPage + 1;

  const handlePreviousClick = (): void => {
    if (!isFirstPage) {
      dispatch({type: 'DECREMENT_PAGE_INDEX'});
    }
  };

  const handleNextClick = (): void => {
    if (!isLastPage) {
      dispatch({type: 'INCREMENT_PAGE_INDEX'});
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
