import {Flex, Switch, Tag} from '@chakra-ui/react';
import {isBefore} from 'date-fns';
import {Column, FilterTypeEnum, SearchTypeEnum} from '@/components/table';
import {TODAYS_DATE} from '@/shared/const';
import {formatDate, getPriorityOptions, GetPriorityOptionsEnum, tagOptions} from '@/shared/lib/helpers';
import {statusOptionsWithALL} from '@/shared/lib/helpers/enumLabelResolver/enumLabelResolver';
import {StatusEnum, TaskI} from '@/shared/types/task';
import {DeleteButton, EditButton} from '@/shared/ui';

interface Props {
  updateTaskStatus: ({id, status}: {id: string; status: StatusEnum}) => void;
  updateTaskStatusIsLoading: boolean;
  deleteTask: ({id}: {id: string}) => void;
  taskDeleteIsLoading: boolean;
}

type RenderSwitchCellProps = Pick<Props, 'updateTaskStatus' | 'updateTaskStatusIsLoading'>;
type RenderActionsCellProps = Pick<Props, 'deleteTask' | 'taskDeleteIsLoading'>;

const renderSwitchCell =
  ({updateTaskStatus, updateTaskStatusIsLoading}: RenderSwitchCellProps) =>
  (_: string, task: TaskI) => {
    const isCompleted = task.status === StatusEnum.COMPLETED ? true : false;
    const dateIsExpired = isBefore(task.expDate, TODAYS_DATE);

    return (
      <Switch
        isDisabled={updateTaskStatusIsLoading || dateIsExpired}
        isChecked={isCompleted}
        onChange={() => updateTaskStatus({id: task._id, status: task.status})}
      />
    );
  };

const renderPriorityCell = (priority: number) =>
  getPriorityOptions(GetPriorityOptionsEnum.withIcons).find((option) => option.value === priority)?.label;

const renderTagsCell = (tags: number[]) => (
  <Flex gap={2}>
    {tags.map((tag) => (
      <Tag key={tag} variant="solid" colorScheme="teal">
        {tagOptions.find((option) => option.value === tag)?.label}
      </Tag>
    ))}
  </Flex>
);

const renderExpirationDateCell = (expDate: Date) => formatDate(expDate);

const renderActionsCell =
  ({deleteTask, taskDeleteIsLoading}: RenderActionsCellProps) =>
  (_: string, task: TaskI) => {
    const dateIsExpired = isBefore(task.expDate, TODAYS_DATE);

    return (
      <Flex justifyContent="flex-end">
        <Flex gap={2}>
          <EditButton id={task._id} isDisabled={dateIsExpired} />
          <DeleteButton
            variant={dateIsExpired ? 'errorFilled' : 'error'}
            onClick={() => deleteTask({id: task._id})}
            isDisabled={taskDeleteIsLoading}
          />
        </Flex>
      </Flex>
    );
  };

export const getColumns = ({updateTaskStatus, updateTaskStatusIsLoading, deleteTask, taskDeleteIsLoading}: Props): Column<TaskI>[] => [
  {
    header: 'Status',
    accessor: 'status',
    cell: renderSwitchCell({updateTaskStatus, updateTaskStatusIsLoading}),
    filter: {
      type: FilterTypeEnum.SELECT,
      options: statusOptionsWithALL
    }
  },
  {
    header: 'Note',
    accessor: 'note',
    search: {
      type: SearchTypeEnum.POPOVER_INPUT
    }
  },
  {
    header: 'Priority',
    accessor: 'priority',
    cell: renderPriorityCell,
    filter: {
      type: FilterTypeEnum.SELECT,
      options: getPriorityOptions(GetPriorityOptionsEnum.withIconsAndLabel)
    }
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
    filter: {
      type: FilterTypeEnum.RANGE_DATEPICKER
    }
  },
  {
    header: 'Actions',
    accessor: 'actions',
    cell: renderActionsCell({deleteTask, taskDeleteIsLoading})
  }
];
