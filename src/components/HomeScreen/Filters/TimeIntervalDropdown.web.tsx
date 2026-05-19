import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { INTERVAL_PICK_OPTIONS, IntervalRange } from '@/src/constants/types';
import CalendarPicker from './CalendarPicker.web';
import { OPTIONS } from '@/src/constants/constants';
import { useAppSelector } from '@/src/hooks/hooks';

export default function TimeIntervalDropdown({
  anchorEl,
  anchorGroupEl,
  anchorWidth,
  onSelect,
  onClose,
  earliestRecordDate,
  latestRecordDate,
}: {
  anchorEl: HTMLElement;
  anchorGroupEl: React.RefObject<HTMLDivElement | null>;
  anchorWidth: number;
  onSelect: (range: IntervalRange) => void;
  onClose: () => void;
  earliestRecordDate: Date;
  latestRecordDate: Date;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const userChoice = useAppSelector(
    (state) => state.data.selectedIntervalRange.choice,
  );

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;

      if (ref.current?.contains(target)) return;
      if (anchorEl.contains(target)) return;
      if (anchorGroupEl.current?.contains(target)) return;

      onClose();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, anchorEl, anchorGroupEl]);

  const rect = anchorGroupEl.current
    ? anchorGroupEl.current.getBoundingClientRect()
    : anchorEl.getBoundingClientRect();

  const handleSelection = (start: Date, end: Date) => {
    setRangeStart(start);
    setRangeEnd(end);
  };

  const handlePresetAction = (choice: INTERVAL_PICK_OPTIONS) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let start: Date | null = null;
    let end: Date | null = null;

    switch (choice) {
      case 'current_week': {
        const day = today.getDay() || 7; // Monday = 1
        start = new Date(today);
        start.setDate(today.getDate() - (day - 1));

        end = new Date(start);
        end.setDate(start.getDate() + 6);
        break;
      }

      case 'last_two_weeks': {
        const day = today.getDay() || 7; // Monday = 1
        start = new Date(today);
        start.setDate(today.getDate() - day - 6); // 14 days total

        end = new Date(start);
        end.setDate(start.getDate() + 13);
        break;
      }

      case 'current_month': {
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      }

      case 'last_three_months': {
        start = new Date(today.getFullYear(), today.getMonth() - 2, 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      }

      case 'current_year': {
        start = new Date(today.getFullYear(), 0, 1);
        end = new Date(today.getFullYear(), 11, 31);
        break;
      }

      case 'all_time': {
        start = earliestRecordDate;
        end = latestRecordDate;
        break;
      }

      case 'custom': {
        // ✅ only finalize if both selected
        if (rangeStart && rangeEnd) {
          start = rangeStart;
          end = rangeEnd;
        } else {
          return;
        }
      }
    }

    onSelect({
      choice,
      start,
      end,
    });
  };

  return createPortal(
    <div
      ref={ref}
      className='absolute z-50 rounded-lg bg-white shadow-md p-2 flex gap-3'
      style={{
        width: anchorWidth,
        top: rect.bottom + 16,
        left: rect.left,
      }}
    >
      <CalendarPicker
        onConfirmSelection={handleSelection}
        earliestRecordDate={earliestRecordDate}
        latestRecordDate={latestRecordDate}
      />

      <div className='w-[45%] flex flex-col pt-5'>
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() =>
              handlePresetAction(
                opt.value === 'clear' ? 'current_month' : opt.value,
              )
            }
            // disabled={userChoice === 'current_month' && opt.value === 'clear'}
            className={`text-left px-3 py-1 rounded-md text-xs font-jetbrains-500 ${
              opt.value === userChoice
                ? 'bg-gray-100 font-jetbrains-800'
                : opt.value === 'clear'
                  ? userChoice !== 'current_month'
                    ? 'text-red-500 hover:text-red-600 hover:bg-gray-100'
                    : 'text-red-500 cursor-not-allowed pointer-events-none'
                  : 'hover:bg-gray-100 '
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>,
    document.body,
  );
}
