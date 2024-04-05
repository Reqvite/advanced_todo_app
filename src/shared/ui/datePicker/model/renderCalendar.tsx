import {Box, Button, Flex, IconButton} from '@chakra-ui/react';
import {addDays, addMonths, endOfMonth, isAfter, isWithinInterval, startOfMonth, subMonths} from 'date-fns';
import {useState} from 'react';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import {formatDayDate, formatMonthWithYearDate} from '@/shared/lib/helpers';

interface RenderCalendarProps {
  selectedDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  isRangePicker: boolean;
  handleDateClick: (date: Date) => void;
  minDate?: Date;
}

const ADD_1_DAY = 1;
const WEEK_LENGTH = 7;

export const RenderCalendar = ({selectedDate, startDate, endDate, isRangePicker, handleDateClick, minDate}: RenderCalendarProps) => {
  const [monthStart, setMonthStart] = useState<Date>(startOfMonth(selectedDate || new Date()));
  const [weeks, setWeeks] = useState<Date[][]>(generateWeeks(monthStart));

  function generateWeeks(monthStart: Date): Date[][] {
    const startDateOfMonth = startOfMonth(monthStart);
    const endDateOfMonth = endOfMonth(monthStart);
    const newWeeks: Date[][] = [];
    let week: Date[] = [];
    let currentDate = startDateOfMonth;

    while (currentDate <= endDateOfMonth) {
      if (week.length === WEEK_LENGTH) {
        newWeeks.push(week);
        week = [];
      }
      week.push(currentDate);
      currentDate = addDays(currentDate, ADD_1_DAY);
    }

    newWeeks.push(week);
    return newWeeks;
  }

  const handlePrevMonthClick = () => {
    setMonthStart(subMonths(monthStart, 1));
    setWeeks(generateWeeks(subMonths(monthStart, 1)));
  };

  const handleNextMonthClick = () => {
    setMonthStart(addMonths(monthStart, 1));
    setWeeks(generateWeeks(addMonths(monthStart, 1)));
  };

  return (
    <Flex flexDirection="column">
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <IconButton aria-label="Previous month" icon={<FiChevronLeft />} onClick={handlePrevMonthClick} variant="ghost" size="sm" />
        <Box fontSize="xl">{formatMonthWithYearDate(monthStart)}</Box>
        <IconButton aria-label="Next month" icon={<FiChevronRight />} onClick={handleNextMonthClick} variant="ghost" size="sm" />
      </Flex>
      {weeks.map((week, index) => (
        <Flex gap={1} key={index} justifyContent="center">
          {week.map((date) => {
            const isAfterMinDate = minDate && isAfter(date, minDate);
            const isInRange = isRangePicker && startDate && endDate && isWithinInterval(date, {start: startDate, end: endDate});
            const isSelected = !isRangePicker && selectedDate && date.getTime() === selectedDate.getTime();
            const isStartSelected = isRangePicker && startDate && date.getTime() === startDate.getTime();
            const isEndSelected = isRangePicker && endDate && date.getTime() === endDate.getTime();
            const buttonVariant = isInRange || isSelected || isStartSelected || isEndSelected ? 'primary' : 'secondary';

            return (
              <Button
                isDisabled={minDate && !isAfterMinDate}
                key={date.toISOString()}
                variant={buttonVariant}
                onClick={() => {
                  handleDateClick(date);
                }}
                w="50px"
                alignSelf="center"
                mb="2px"
              >
                {formatDayDate(date)}
              </Button>
            );
          })}
        </Flex>
      ))}
    </Flex>
  );
};
