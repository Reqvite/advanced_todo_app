import {Flex, Switch, Tag} from '@chakra-ui/react';
import {Column} from '@/components/table';
import {formatDate, priorityOptions, tagOptions} from '@/shared/lib/helpers';
import {TaskI} from '@/shared/types/task';
import {DeleteButton, EditButton} from '@/shared/ui';
import {useUpdateTaskStatusByIdMutation} from '@/slices/task/task.rtk';

const renderSwitchCell = () => (_: string, task: TaskI) => {
  const [updateTaskStatus, {isLoading}] = useUpdateTaskStatusByIdMutation();
  return <Switch isDisabled={isLoading} isChecked={task.isCompleted} onChange={() => updateTaskStatus({id: task._id, status: task.isCompleted})} />;
};

const renderPriorityCell = (priority: number) => priorityOptions.find((option) => option.value === priority)?.label;

const renderTagsCell = (tags: number[]) => (
  <Flex gap={2}>
    {tags.map((tag) => (
      <Tag key={tag} variant="solid" colorScheme="teal">
        {tagOptions.find((option) => option.value === tag)?.label}
      </Tag>
    ))}
  </Flex>
);

const renderExpirationDateCell = (expDate: string) => formatDate(new Date(expDate));

const renderActionsCell = (_: string, task: TaskI) => (
  <Flex justifyContent="flex-end">
    <Flex gap={2}>
      <DeleteButton />
      <EditButton id={task._id} />
    </Flex>
  </Flex>
);

export const getColumns = (): Column<TaskI>[] => [
  {
    header: '',
    accessor: 'id',
    cell: renderSwitchCell()
  },
  {
    header: 'Note',
    accessor: 'note'
  },
  {
    header: 'Priority',
    accessor: 'priority',
    cell: renderPriorityCell
  },
  {
    header: 'Tags',
    accessor: 'tags',
    cell: renderTagsCell
  },
  {
    header: 'Expiration date',
    accessor: 'expDate',
    cell: renderExpirationDateCell
  },
  {
    header: '',
    accessor: 'actions',
    cell: renderActionsCell
  }
];
