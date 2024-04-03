import {Button} from '@chakra-ui/button';
import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal
} from '@chakra-ui/react';
import {addDays, addMonths, endOfMonth, format, isWithinInterval, startOfMonth, subMonths} from 'date-fns';
import React, {ReactElement, useState} from 'react';
import {FaCalendarAlt} from 'react-icons/fa';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';

interface DatePickerProps {
  isRangePicker?: boolean;
  onDateSelect: (date: Date | null | [Date, Date] | null) => void;
  showInput?: boolean;
}

const ADD_1_DAY = 1;
const WEEK_LENGTH = 7;

export const DatePicker: React.FC<DatePickerProps> = ({isRangePicker = false, onDateSelect, showInput = true}): ReactElement => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const handleDateClick = (date: Date) => {
    if (!isRangePicker) {
      setSelectedDate(date);
      onDateSelect(date);
      setShowCalendar(false);
    } else {
      if (!startDate || endDate) {
        setStartDate(date);
        setEndDate(null);
      } else if (startDate && !endDate && date >= startDate) {
        setEndDate(date);
        onDateSelect([startDate, date]);
        setShowCalendar(false);
      } else {
        setStartDate(date);
        setEndDate(null);
      }
    }
  };

  const renderCalendar = () => {
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
            {week.map((date) => (
              <Button
                key={date.toISOString()}
                variant={isRangePicker && startDate && endDate && isWithinInterval(date, {start: startDate, end: endDate}) ? 'primary' : 'secondary'}
                colorScheme={isRangePicker && startDate && endDate && isWithinInterval(date, {start: startDate, end: endDate}) ? 'blue' : undefined}
                onClick={() => handleDateClick(date)}
                w="50px"
                alignSelf="center"
                mb="2px"
              >
                {format(date, 'd')}
              </Button>
            ))}
          </Flex>
        ))}
      </Flex>
    );
  };

  return (
    <Popover isOpen={showCalendar} onClose={() => setShowCalendar(false)} placement="bottom">
      {showInput ? (
        <PopoverTrigger>
          {showInput && (
            <InputGroup onClick={() => setShowCalendar(!showCalendar)}>
              <InputLeftElement pointerEvents="none" children={<FaCalendarAlt color="gray.300" />} />
              <Input
                placeholder="Select Date"
                value={
                  isRangePicker && startDate && endDate
                    ? `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`
                    : selectedDate
                      ? format(selectedDate, 'MMM d, yyyy')
                      : ''
                }
                readOnly
              />
            </InputGroup>
          )}
        </PopoverTrigger>
      ) : (
        <PopoverTrigger>
          <IconButton
            aria-label="Calendar"
            variant="primary"
            w="25px"
            h="25px"
            minW="25px"
            icon={<FaCalendarAlt color="gray.300" />}
            onClick={() => setShowCalendar(!showCalendar)}
          />
        </PopoverTrigger>
      )}
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>{renderCalendar()}</PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
