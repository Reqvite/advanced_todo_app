import {Flex} from '@chakra-ui/react';
import {isBefore} from 'date-fns';
import {ReactNode} from 'react';
import {Column, FilterTypeEnum} from '@/components/table';
import {FORMAT_DATES, TODAYS_DATE} from '@/shared/const';
import {getPriorityOptions, GetPriorityOptionsEnum} from '@/shared/lib/helpers';
import {statusOptionsWithALL} from '@/shared/lib/helpers/enumLabelResolver/enumLabelResolver';
import {StatusEnum, TaskI} from '@/shared/types/task';
import {DeleteButton, EditButton, TagList} from '@/shared/ui';
import {SwitchButton} from '@/shared/ui/buttons/SwitchButton';

interface Props {
  updateTaskStatus: ({id, status}: {id: string; status: StatusEnum}) => void;
  updateTaskStatusIsLoading: boolean;
  deleteTask: ({id}: {id: string}) => void;
  taskDeleteIsLoading: boolean;
}

type RenderSwitchCellProps = Pick<Props, 'updateTaskStatus' | 'updateTaskStatusIsLoading'>;
type RenderActionsCellProps = Pick<Props, 'deleteTask' | 'taskDeleteIsLoading'>;

const renderSwitchCell =
  ({updateTaskStatus}: RenderSwitchCellProps) =>
  (_: string, task: TaskI): ReactNode => {
    const isCompleted = task.status === StatusEnum.COMPLETED ? true : false;
    const dateIsExpired = isBefore(task.expDate, TODAYS_DATE);

    return (
      <SwitchButton isDisabled={dateIsExpired} isChecked={isCompleted} onConfirm={() => updateTaskStatus({id: task._id, status: task.status})} />
    );
  };

const renderPriorityCell = (priority: number): ReactNode =>
  getPriorityOptions(GetPriorityOptionsEnum.withIcons).find((option) => option.value === priority)?.label;

const renderTagsCell = (tags: number[]) => (
  <Flex gap={2}>
    <TagList items={tags} />
  </Flex>
);

const renderExpirationDateCell = (expDate: Date): ReactNode => FORMAT_DATES.MONTH_DATE_YEAR(expDate);

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
            onConfirm={() => deleteTask({id: task._id})}
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
      placeholder: 'Status',
      type: FilterTypeEnum.MULTI_SELECT,
      options: statusOptionsWithALL
    }
  },
  {
    header: 'Note',
    accessor: 'note',
    isTruncated: true,
    width: '25%'
  },
  {
    header: 'Priority',
    accessor: 'priority',
    cell: renderPriorityCell,
    filter: {
      placeholder: 'Priority',
      type: FilterTypeEnum.MULTI_SELECT,
      options: getPriorityOptions(GetPriorityOptionsEnum.withIconsAndLabel)
    }
  },
  {
    header: 'Tags',
    accessor: 'tags',
    cell: renderTagsCell,
    width: '28%'
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
