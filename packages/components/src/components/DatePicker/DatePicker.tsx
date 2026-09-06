import React from 'react';

export interface DatePickerProps {
  value?: Date | string | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  placeholder?: string;
  format?: string;
  rangeMode?: boolean;
  startDate?: Date;
  endDate?: Date;
  onRangeChange?: (range: [Date | null, Date | null]) => void;
  locale?: string;
  disabledDates?: Date[] | ((date: Date) => boolean);
  showWeekNumbers?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  disabled = false,
  placeholder = 'Select date...'
}) => (
  <div className="ds-DatePicker">
    <input 
      type="date" 
      disabled={disabled}
      placeholder={placeholder}
      className="ds-DatePicker__input"
    />
  </div>
);

export default DatePicker;
