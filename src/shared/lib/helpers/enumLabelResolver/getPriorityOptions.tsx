import {Flex} from '@chakra-ui/react';
import {LabelOptionsI} from '@/shared/types/options';
import {enumLabelResolver} from './enumLabelResolver';

export enum GetPriorityOptionsEnum {
  withAll,
  withIcons,
  withIconsAndLabel
}
export const getPriorityOptions = (option?: GetPriorityOptionsEnum): LabelOptionsI[] => {
  switch (option) {
    case GetPriorityOptionsEnum.withAll:
      return Object.entries(enumLabelResolver.priority).map(([value, {label}]) => ({
        label,
        value: Number(value)
      }));
    case GetPriorityOptionsEnum.withIcons:
      return Object.entries(enumLabelResolver.priority)
        .filter(([value]) => value !== '0')
        .map(([value, {label, icon}]) => ({
          label: icon ? <>{icon}</> : label,
          value: Number(value)
        }));
    case GetPriorityOptionsEnum.withIconsAndLabel:
      return Object.entries(enumLabelResolver.priority).map(([value, {label, icon}]) => ({
        label: icon ? (
          <Flex gap={2} alignItems="center">
            {icon} {label}
          </Flex>
        ) : (
          label
        ),
        value: Number(value)
      }));
    default:
      return Object.entries(enumLabelResolver.priority)
        .filter(([value]) => value !== '0')
        .map(([value, {label}]) => ({
          label,
          value: Number(value)
        }));
  }
};
