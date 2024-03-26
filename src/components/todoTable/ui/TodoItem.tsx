import {Flex, Switch, Tag, Td, Tr} from '@chakra-ui/react';
import {TODAYS_DATE} from '@/shared/const';
import {formatDate} from '@/shared/lib/helpers';
import {TodoI} from '@/shared/types/todo';
import {DeleteButton, EditButton} from '@/shared/ui';

type Props = TodoI;

export const TodoItem = (props: Props) => {
  const {_id, note, priority, expDate, tags} = props;
  const isDisabled = new Date(expDate).getTime() === new Date(TODAYS_DATE).getTime();

  return (
    <Tr key={_id} pointerEvents={isDisabled ? 'none' : 'auto'} style={{filter: isDisabled ? 'brightness(0.4)' : 'none'}}>
      <Td>
        <Switch isDisabled={isDisabled} />
      </Td>
      <Td width={'40%'}>{note}</Td>
      <Td>{priority}</Td>
      <Td>
        <Flex gap={2}>
          {tags.map((tag, idx) => (
            <Tag key={idx} variant="solid" colorScheme="teal">
              {tag}
            </Tag>
          ))}
        </Flex>
      </Td>
      <Td>{formatDate(new Date(expDate))}</Td>
      <Td>
        <Flex justifyContent={'flex-end'}>
          <Flex gap={2}>
            <DeleteButton isDisabled={isDisabled} />
            <EditButton id={_id} />
          </Flex>
        </Flex>
      </Td>
    </Tr>
  );
};
