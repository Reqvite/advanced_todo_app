import {IconButton, InputGroup, Popover, PopoverArrow, PopoverContent, PopoverTrigger, Portal} from '@chakra-ui/react';
import {ForwardedRef, forwardRef, ReactElement, useState} from 'react';
import {FaCalendarAlt} from 'react-icons/fa';
import {FORMAT_DATES} from '@/shared/const';
import {Input} from '..';
import {RenderCalendar} from './model/renderCalendar';

interface DatePickerProps {
  isRangePicker?: boolean;
  onChange: (date: Date | null | [Date, Date] | null | string) => void;
  showInput?: boolean;
  minDate?: Date;
  isRequired?: boolean;
  label?: string;
  error?: string;
  withError?: boolean;
  value?: string | number | readonly string[] | undefined;
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {isRangePicker = false, onChange, showInput = true, minDate, isRequired, label, error, withError = true, ...otherProps}: DatePickerProps,
    ref: ForwardedRef<HTMLDivElement>
  ): ReactElement => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);

    const handleSingleDateClick = (date: Date): void => {
      setSelectedDate(date);
      onChange(FORMAT_DATES.MONTH_DATE_YEAR(date));
      setShowCalendar(false);
    };

    const handleRangeDateClick = (date: Date): void => {
      switch (true) {
        case !startDate || endDate:
          setStartDate(date);
          setEndDate(null);
          break;
        case startDate && !endDate && date >= startDate:
          setEndDate(date);
          onChange([startDate, date]);
          setShowCalendar(false);
          break;
        default:
          setStartDate(date);
          setEndDate(null);
          break;
      }
    };

    const handleDateClick = (date: Date): void => {
      if (!isRangePicker) {
        handleSingleDateClick(date);
      } else {
        handleRangeDateClick(date);
      }
    };

    const getDateRangeString = (): string => {
      if (isRangePicker && startDate && endDate) {
        return `${FORMAT_DATES.MONTH_DATE_YEAR(startDate)} - ${FORMAT_DATES.MONTH_DATE_YEAR(endDate)}`;
      } else if (selectedDate) {
        return FORMAT_DATES.MONTH_DATE_YEAR(selectedDate);
      } else {
        return '';
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
                  withError={withError}
                  placeholder="Select Date"
                  value={getDateRangeString()}
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
              w={'40px'}
              h={'40px'}
              minW={'40px'}
              icon={<FaCalendarAlt size={20} color="gray.300" />}
              onClick={() => setShowCalendar((prev) => !prev)}
            />
          </PopoverTrigger>
        )}
        <Portal>
          <PopoverContent padding={2} zIndex={1000000}>
            <PopoverArrow />
            <RenderCalendar
              selectedDate={selectedDate}
              startDate={startDate}
              endDate={endDate}
              isRangePicker={isRangePicker}
              handleDateClick={handleDateClick}
              minDate={minDate}
            />
          </PopoverContent>
        </Portal>
      </Popover>
    );
  }
);
