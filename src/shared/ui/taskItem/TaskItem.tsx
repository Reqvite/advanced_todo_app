import {Flex, Switch, Tag as ChakraTag, Td, Tr} from '@chakra-ui/react';
import {ReactElement} from 'react';
import {TODAYS_DATE} from '@/shared/const';
import {formatDate, priorityOptions, tagOptions} from '@/shared/lib/helpers';
import {TaskI} from '@/shared/types/task';
import {DeleteButton, EditButton} from '@/shared/ui';

export const TaskItem = (props: TaskI): ReactElement => {
  const {_id, note, priority, expDate, tags} = props;
  const isDisabled = new Date(expDate).getTime() < new Date(TODAYS_DATE).getTime();
  const priorityValue = priorityOptions.find((option) => option.value === priority)?.label;

  return (
    <Tr key={_id} pointerEvents={isDisabled ? 'none' : 'auto'} style={{filter: isDisabled ? 'brightness(0.4)' : 'none'}}>
      <Td>
        <Switch isDisabled={isDisabled} />
      </Td>
      <Td width="40%">{note}</Td>
      <Td>{priorityValue}</Td>
      <Td>
        <Flex gap={2}>
          {tags.map((tag, idx) => (
            <ChakraTag key={idx} variant="solid" colorScheme="teal">
              {tagOptions.find((option) => option.value === tag)?.label}
            </ChakraTag>
          ))}
        </Flex>
      </Td>
      <Td>{formatDate(new Date(expDate))}</Td>
      <Td>
        <Flex justifyContent="flex-end">
          <Flex gap={2}>
            <DeleteButton isDisabled={isDisabled} />
            <EditButton id={_id} />
          </Flex>
        </Flex>
      </Td>
    </Tr>
  );
};
