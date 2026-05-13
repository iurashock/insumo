import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { INTERVAL_PICK_OPTIONS, IntervalRange } from '@/src/constants/types';
import CalendarPicker from './CalendarPicker.web';
import { OPTIONS } from '@/src/constants/constants';

export default function TimeIntervalDropdown({
  anchorEl,
  anchorGroupEl,
  anchorWidth,
  onSelect,
  onClose,
}: {
  anchorEl: HTMLElement;
  anchorGroupEl: React.RefObject<HTMLDivElement | null>;
  anchorWidth: number;
  onSelect: (range: IntervalRange) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;

      if (ref.current?.contains(target)) return;
      if (anchorEl.contains(target)) return;
      if (anchorGroupEl.current?.contains(target)) return;

      onClose();
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose, anchorEl, anchorGroupEl]);

  const rect = anchorGroupEl.current
    ? anchorGroupEl.current.getBoundingClientRect()
    : anchorEl.getBoundingClientRect();

  const handleSelection = (start: Date, end: Date) => {
    console.log('entered: ', start, end);

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
        end = new Date(today);
        start = new Date(today);
        start.setDate(today.getDate() - 13); // 14 days total
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
        start = null;
        end = null;
        break;
      }

      case 'custom': {
        // ✅ only finalize if both selected
        if (rangeStart && rangeEnd) {
          onSelect({
            choice: 'custom',
            start: rangeStart,
            end: rangeEnd,
          });
        }
        return;
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
      <CalendarPicker onConfirmSelection={handleSelection} />

      <div className='w-[45%] flex flex-col pt-5'>
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handlePresetAction(opt.value)}
            className={`text-left px-3 py-1 rounded-md text-xs font-jetbrains-500 ${
              'custom' === opt.value
                ? 'bg-gray-100 font-jetbrains-800'
                : 'hover:bg-gray-50'
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
