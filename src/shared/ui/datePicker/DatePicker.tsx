import {
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
import {format} from 'date-fns';
import React, {ReactElement, useState} from 'react';
import {FaCalendarAlt} from 'react-icons/fa';
import {renderCalendar} from './model/renderCalendar';

interface DatePickerProps {
  isRangePicker?: boolean;
  onDateSelect: (date: Date | null | [Date, Date] | null) => void;
  showInput?: boolean;
}

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

  return (
    <Popover isOpen={showCalendar} onClose={() => setShowCalendar(false)} placement="bottom">
      {showInput ? (
        <PopoverTrigger>
          {showInput && (
            <InputGroup onClick={() => setShowCalendar((prev) => !prev)}>
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
            onClick={() => setShowCalendar((prev) => !prev)}
          />
        </PopoverTrigger>
      )}
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>{renderCalendar({selectedDate, startDate, endDate, isRangePicker, handleDateClick, setSelectedDate})}</PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
