import {Flex, Text} from '@chakra-ui/react';
import {isBefore} from 'date-fns';
import {ReactElement} from 'react';
import {FaCalendarTimes} from 'react-icons/fa';
import {FcCheckmark} from 'react-icons/fc';
import {MdBlockFlipped} from 'react-icons/md';
import {TODAYS_DATE} from '@/shared/const';
import {StatusEnum} from '@/shared/types/task';
import {Tooltip} from '..';

interface Props<T> {
  items: T[];
}

export const Counter = <T extends {status: StatusEnum; expDate: Date}>({items}: Props<T>): ReactElement => {
  const completed = items.filter((el) => el.status === StatusEnum.COMPLETED).length;
  const notCompleted = items.filter((el) => el.status === StatusEnum.NOT_COMPLETED).length;
  const dateIsExpired = items.filter((el) => isBefore(el?.expDate, TODAYS_DATE)).length;

  return (
    <Flex gap={2} alignItems="center">
      <Tooltip label="Completed">
        <Flex alignItems="center" gap={2}>
          <FcCheckmark size={20} />
          <Text>{completed}</Text>
        </Flex>
      </Tooltip>
      <Tooltip label="Not completed">
        <Flex alignItems="center" gap={2}>
          <MdBlockFlipped size={20} color="#ff9966" />
          <Text>{notCompleted}</Text>
        </Flex>
      </Tooltip>
      <Tooltip label="Expired time">
        <Flex alignItems="center" gap={2}>
          <FaCalendarTimes size={18} color="#E53E3E" />
          <Text>{dateIsExpired}</Text>
        </Flex>
      </Tooltip>
    </Flex>
  );
};
