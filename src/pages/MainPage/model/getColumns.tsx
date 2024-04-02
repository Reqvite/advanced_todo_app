import {Flex, Switch, Tag} from '@chakra-ui/react';
import {Column} from '@/components/table';
import {formatDate, priorityOptions, tagOptions} from '@/shared/lib/helpers';
import {DeleteButton, EditButton} from '@/shared/ui';

type RenderSwitchCellProps = {
  onToggleTask: (id: string) => void;
};

const renderSwitchCell =
  ({onToggleTask}: RenderSwitchCellProps) =>
  (_: string, id: string) => <Switch onChange={() => onToggleTask(id)} />;

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

const renderActionsCell = (_: string, id: string) => (
  <Flex justifyContent="flex-end">
    <Flex gap={2}>
      <DeleteButton />
      <EditButton id={id} />
    </Flex>
  </Flex>
);

export const getColumns = ({onToggleTask}: RenderSwitchCellProps): Column[] => [
  {
    header: '',
    accessor: 'id',
    cell: renderSwitchCell({onToggleTask})
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
