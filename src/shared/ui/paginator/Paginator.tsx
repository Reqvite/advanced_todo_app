import {Flex, IconButton, Text} from '@chakra-ui/react';
import {ReactElement} from 'react';
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa';
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
      <IconButton aria-label="back" icon={<FaArrowAltCircleLeft />} variant="primary" onClick={handlePreviousClick} isDisabled={isFirstPage} />
      <Text>
        {displayedPage}/{totalPages}
      </Text>
      <IconButton aria-label="next" icon={<FaArrowAltCircleRight />} variant="primary" onClick={handleNextClick} isDisabled={isLastPage} />
    </Flex>
  );
};
