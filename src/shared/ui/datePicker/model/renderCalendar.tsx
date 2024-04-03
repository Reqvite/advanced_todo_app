import {Box, Button, Flex, IconButton} from '@chakra-ui/react';
import {addDays, addMonths, endOfMonth, format, isWithinInterval, startOfMonth, subMonths} from 'date-fns';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';

interface RenderCalendarProps {
  selectedDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  isRangePicker: boolean;
  handleDateClick: (date: Date) => void;
  setSelectedDate: (date: Date) => void;
}

const ADD_1_DAY = 1;
const WEEK_LENGTH = 7;

export const renderCalendar = ({selectedDate, startDate, endDate, isRangePicker, handleDateClick, setSelectedDate}: RenderCalendarProps) => {
  const monthStart = startOfMonth(selectedDate || new Date());
  const startDateOfMonth = startOfMonth(monthStart);
  const endDateOfMonth = endOfMonth(monthStart);
  const weeks: Date[][] = [];
  let week: Date[] = [];
  let currentDate = startDateOfMonth;

  while (currentDate <= endDateOfMonth) {
    if (week.length === WEEK_LENGTH) {
      weeks.push(week);
      week = [];
    }
    week.push(currentDate);
    currentDate = addDays(currentDate, ADD_1_DAY);
  }

  weeks.push(week);

  return (
    <Flex flexDirection="column">
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <IconButton
          aria-label="Previous month"
          icon={<FiChevronLeft />}
          onClick={() => setSelectedDate(subMonths(selectedDate || new Date(), 1))}
          variant="ghost"
          size="sm"
        />
        <Box fontSize="xl">{format(selectedDate || new Date(), 'MMMM yyyy')}</Box>
        <IconButton
          aria-label="Next month"
          icon={<FiChevronRight />}
          onClick={() => setSelectedDate(addMonths(selectedDate || new Date(), 1))}
          variant="ghost"
          size="sm"
        />
      </Flex>
      {weeks.map((week, index) => (
        <Flex gap={1} key={index} justifyContent="center">
          {week.map((date) => {
            const isInRange = isRangePicker && startDate && endDate && isWithinInterval(date, {start: startDate, end: endDate});
            const isSelected = !isRangePicker && selectedDate && date.getTime() === selectedDate.getTime();
            const isStartSelected = isRangePicker && startDate && date.getTime() === startDate.getTime();
            const isEndSelected = isRangePicker && endDate && date.getTime() === endDate.getTime();

            return (
              <Button
                key={date.toISOString()}
                variant={isInRange || isSelected || isStartSelected || isEndSelected ? 'primary' : 'secondary'}
                colorScheme={isInRange || isSelected || isStartSelected || isEndSelected ? 'blue' : undefined}
                onClick={() => handleDateClick(date)}
                w="50px"
                alignSelf="center"
                mb="2px"
              >
                {format(date, 'd')}
              </Button>
            );
          })}
        </Flex>
      ))}
    </Flex>
  );
};
