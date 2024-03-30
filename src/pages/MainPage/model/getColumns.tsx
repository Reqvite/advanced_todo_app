import {Flex, Switch, Tag} from '@chakra-ui/react';
import {Column} from '@/components/table';
import {formatDate, priorityOptions, tagOptions} from '@/shared/lib/helpers';
import {DeleteButton, EditButton} from '@/shared/ui';

type getColumnsProps = {
  onToggleTask: (id: string) => void;
};

export const getColumns = ({onToggleTask}: getColumnsProps): Column[] => [
  {
    header: '',
    accessor: 'id',
    cell: (_: string, id: string) => <Switch onChange={() => onToggleTask(id)} />
  },
  {
    header: 'Note',
    accessor: 'note'
  },
  {
    header: 'Priority',
    accessor: 'priority',
    cell: (priority: number) => priorityOptions.find((option) => option.value === priority)?.label
  },
  {
    header: 'Tags',
    accessor: 'tags',
    cell: (tags: number[]) => (
      <Flex gap={2}>
        {tags.map((tag) => (
          <Tag key={tag} variant="solid" colorScheme="teal">
            {tagOptions.find((option) => option.value === tag)?.label}
          </Tag>
        ))}
      </Flex>
    )
  },
  {
    header: 'Expiration date',
    accessor: 'expDate',
    cell: (expDate: string) => formatDate(new Date(expDate))
  },
  {
    header: '',
    accessor: 'actions',
    cell: (_: string, id: string) => (
      <Flex justifyContent="flex-end">
        <Flex gap={2}>
          <DeleteButton />
          <EditButton id={id} />
        </Flex>
      </Flex>
    )
  }
];
