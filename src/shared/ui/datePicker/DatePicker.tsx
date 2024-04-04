import {IconButton, InputGroup, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Portal} from '@chakra-ui/react';
import {ForwardedRef, forwardRef, ReactElement, useState} from 'react';
import {FaCalendarAlt} from 'react-icons/fa';
import {formatDate} from '@/shared/lib/helpers';
import {Input} from '..';
import {renderCalendar} from './model/renderCalendar';

interface DatePickerProps {
  isRangePicker?: boolean;
  onChange: (date: Date | null | [Date, Date] | null | string) => void;
  showInput?: boolean;
  minDate?: Date;
  isRequired?: boolean;
  label?: string;
  error?: string;
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {isRangePicker = false, onChange, showInput = true, minDate, isRequired, label, error, ...otherProps}: DatePickerProps,
    ref: ForwardedRef<HTMLDivElement>
  ): ReactElement => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);

    const handleDateClick = (date: Date) => {
      if (!isRangePicker) {
        setSelectedDate(date);
        onChange(formatDate(date));
        setShowCalendar(false);
      } else {
        if (!startDate || endDate) {
          setStartDate(date);
          setEndDate(null);
        } else if (startDate && !endDate && date >= startDate) {
          setEndDate(date);
          onChange([startDate, date]);
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
              <InputGroup onClick={() => setShowCalendar((prev) => !prev)} ref={ref}>
                <Input
                  leftIcon={<FaCalendarAlt color="gray.300" />}
                  isRequired={isRequired}
                  variant="primary"
                  label={label}
                  error={error}
                  placeholder="Select Date"
                  value={
                    isRangePicker && startDate && endDate
                      ? `${formatDate(startDate)} - ${formatDate(endDate)}`
                      : selectedDate
                        ? formatDate(selectedDate)
                        : ''
                  }
                  readOnly
                  {...otherProps}
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
            <PopoverBody>
              {renderCalendar({
                selectedDate,
                startDate,
                endDate,
                isRangePicker,
                handleDateClick,
                setSelectedDate,
                minDate
              })}
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    );
  }
);
