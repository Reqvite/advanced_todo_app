import {IconButton, InputGroup, Popover, PopoverArrow, PopoverContent, PopoverTrigger, Portal, useMediaQuery} from '@chakra-ui/react';
import {ForwardedRef, forwardRef, ReactElement, useState} from 'react';
import {FaCalendarAlt} from 'react-icons/fa';
import {FORMAT_DATES, MEDIA_QUERY} from '@/shared/const';
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
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {isRangePicker = false, onChange, showInput = true, minDate, isRequired, label, error, ...otherProps}: DatePickerProps,
    ref: ForwardedRef<HTMLDivElement>
  ): ReactElement => {
    const [isLargerThan900] = useMediaQuery(MEDIA_QUERY.MIN_WIDTH_TABLET);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const buttonSize = isLargerThan900 ? '25px' : '18px';
    const iconSize = isLargerThan900 ? 13 : 10;

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
              w={buttonSize}
              h={buttonSize}
              minW={buttonSize}
              icon={<FaCalendarAlt size={iconSize} color="gray.300" />}
              onClick={() => setShowCalendar((prev) => !prev)}
            />
          </PopoverTrigger>
        )}
        <Portal>
          <PopoverContent padding={2}>
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
