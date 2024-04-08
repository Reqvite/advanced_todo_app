import {Flex, Text} from '@chakra-ui/react';
import {ReactElement} from 'react';
import {StatusEnum} from '@/shared/types/task';
import {Tooltip} from '..';

interface Props<T> {
  items: T[];
}

export const Counter = <T extends {status: StatusEnum}>({items}: Props<T>): ReactElement => {
  const completed = items.filter((el) => el.status === StatusEnum.COMPLETED).length;
  const notCompleted = items.filter((el) => el.status === StatusEnum.NOT_COMPLETED).length;

  return (
    <Flex gap={2} alignItems="center">
      <Flex>
        <Tooltip label="Completed">
          <Text>✅ </Text>
        </Tooltip>
        <Text>{completed}</Text>
      </Flex>
      <Flex>
        <Tooltip label="Not completed">
          <Text>🚫 </Text>
        </Tooltip>
        <Text>{notCompleted}</Text>
      </Flex>
    </Flex>
  );
};
