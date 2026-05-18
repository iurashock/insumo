import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { INTERVAL_PICK_OPTIONS, IntervalRange } from '@/src/constants/types';
import { useAppSelector } from '@/src/hooks/hooks';
import { MONTH_NAMES, WEEKDAY_LABELS } from '@/src/constants/constants';

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

const CalendarPicker = ({
  onConfirmSelection,
  earliestRecordDate,
  latestRecordDate,
}: {
  onConfirmSelection: (start: Date, end: Date) => void;
  earliestRecordDate: Date;
  latestRecordDate: Date;
}) => {
  const selectedIntervalRange: IntervalRange = useAppSelector(
    (state) => state.data.selectedIntervalRange,
  );

  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);

  useEffect(() => {
    const { choice, start, end } = selectedIntervalRange;
    const today = new Date();

    // ✅ Case 1: invalid or all_time → current month
    if (choice === 'all_time' || !start || !end) {
      setRangeStart(earliestRecordDate);
      setRangeEnd(latestRecordDate);
      if (
        today.getMonth() >= earliestRecordDate.getMonth() &&
        today.getMonth() <= latestRecordDate.getMonth()
      ) {
        setCurrentMonth(today);
      }
      setCurrentMonth(latestRecordDate);
      return;
    }

    setRangeStart(start);
    setRangeEnd(end);

    // Calculate range length in days
    const diffMs = end.getTime() - start.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    // If range is large → show current month
    if (diffDays > 60) {
      if (
        today.getMonth() >= start.getMonth() &&
        today.getMonth() <= end.getMonth()
      ) {
        setCurrentMonth(today);
      }
      setCurrentMonth(end);
      return;
    }

    if (diffDays <= 42) {
      console.log(end.getDate(), end.getMonth(), end.getFullYear());
      if (end.getMonth() - start.getMonth() > 1) {
        console.log(end.getDate(), end.getMonth() - 1, end.getFullYear());
        setCurrentMonth(
          new Date(end.getFullYear(), end.getMonth() - 1, end.getDate()),
        );
      } else {
        setCurrentMonth(end);
      }
    }
  }, [selectedIntervalRange]);

  // const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1,
  );

  // Convert Sunday(0) → 6, Monday(1) → 0, ...
  const startOffset = (firstDayOfMonth.getDay() + 6) % 7;

  const prevMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() - 1,
    1,
  );

  const prevMonthEnd = endOfMonth(prevMonth);
  type CalendarCell = {
    date: Date;
    isCurrentMonth: boolean;
  };

  const days: CalendarCell[] = [];

  // ✅ Previous month tail
  for (let i = startOffset - 1; i >= 0; i--) {
    const day = new Date(
      prevMonth.getFullYear(),
      prevMonth.getMonth(),
      prevMonthEnd.getDate() - i,
    );
    days.push({ date: day, isCurrentMonth: false });
  }

  // ✅ Current month
  for (let d = 1; d <= monthEnd.getDate(); d++) {
    days.push({
      date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d),
      isCurrentMonth: true,
    });
  }

  // ✅ Next month head (fill to 42 cells)
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    const day = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      i,
    );
    days.push({ date: day, isCurrentMonth: false });
  }

  // remove last row ?
  // if (
  //   days.length === 42 &&
  //   days.slice(35, 42).every((d) => !d.isCurrentMonth)
  // ) {
  //   days.splice(35, 7);
  // }

  const handleDayClick = (day: Date) => {
    if (
      !rangeStart ||
      (rangeStart && rangeEnd) ||
      (rangeStart && day < rangeStart)
    ) {
      setRangeStart(day);
      setRangeEnd(null);
      return;
    }

    console.log('day', day);

    setRangeEnd(day);

    onConfirmSelection(rangeStart, day);
  };

  return (
    <div className='w-[55%]'>
      <div className='flex justify-between items-center mb-2 font-jetbrains-600'>
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
            )
          }
        >
          ‹
        </button>

        <div className='text-sm'>
          {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>

        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
            )
          }
        >
          ›
        </button>
      </div>

      <div className='grid grid-cols-7 text-center text-xs font-jetbrains-600 text-gray-500 mb-1'>
        {WEEKDAY_LABELS.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className='grid grid-cols-7 gap-1 text-xs font-jetbrains-200'>
        {days.map(({ date, isCurrentMonth }, index) => {
          const isSelected =
            // isCurrentMonth &&
            (rangeStart && date.toDateString() === rangeStart.toDateString()) ||
            (rangeEnd && date.toDateString() === rangeEnd.toDateString()) ||
            (rangeStart && rangeEnd && date > rangeStart && date < rangeEnd);

          return (
            <button
              key={index}
              onClick={() => {
                handleDayClick(date);
              }}
              className={`w-full aspect-square flex items-center justify-center rounded p-1
${
  date.toDateString() === new Date().toDateString()
    ? 'bg-green-700 text-white font-jetbrains-500'
    : isSelected
      ? isCurrentMonth
        ? 'bg-green-500 text-white'
        : 'bg-green-200 text-green-900'
      : isCurrentMonth
        ? 'hover:bg-gray-200'
        : 'text-gray-400 hover:bg-gray-100'
}`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarPicker;
