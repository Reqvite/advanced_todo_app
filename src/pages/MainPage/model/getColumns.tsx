import {Flex, Switch, Tag} from '@chakra-ui/react';
import {Column} from '@/components/table';
import {formatDate, priorityOptions, tagOptions} from '@/shared/lib/helpers';
import {statusOptions} from '@/shared/lib/helpers/enumLabelResolver/enumLabelResolver';
import {StatusEnum, TaskI} from '@/shared/types/task';
import {DeleteButton, EditButton} from '@/shared/ui';

interface Props {
  updateTaskStatus: ({id, status}: {id: string; status: StatusEnum}) => void;
  updateTaskStatusIsLoading: boolean;
}

type RenderSwitchCellProps = Props;

const renderSwitchCell =
  ({updateTaskStatus, updateTaskStatusIsLoading}: RenderSwitchCellProps) =>
  (_: string, task: TaskI) => {
    const isCompleted = task.status === StatusEnum.COMPLETED ? true : false;
    return (
      <Switch isDisabled={updateTaskStatusIsLoading} isChecked={isCompleted} onChange={() => updateTaskStatus({id: task._id, status: task.status})} />
    );
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

export const getColumns = ({updateTaskStatus, updateTaskStatusIsLoading}: Props): Column<TaskI>[] => [
  {
    header: '',
    accessor: 'status',
    cell: renderSwitchCell({updateTaskStatus, updateTaskStatusIsLoading}),
    filter: statusOptions
  },
  {
    header: 'Note',
    accessor: 'note'
  },
  {
    header: 'Priority',
    accessor: 'priority',
    cell: renderPriorityCell,
    filter: priorityOptions
  },
  {
    header: 'Tags',
    accessor: 'tags',
    cell: renderTagsCell
  },
  {
    header: 'Expiration date',
    accessor: 'expDate',
    cell: renderExpirationDateCell,
    datePicker: true
  },
  {
    header: '',
    accessor: 'actions',
    cell: renderActionsCell
  }
];
