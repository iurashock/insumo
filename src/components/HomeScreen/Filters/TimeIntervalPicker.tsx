import { View, Text, Pressable } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { IntervalRange } from '@/src/constants/types';
import TimeIntervalDropdown from './TimeIntervalDropdown.web';
import { useAppDispatch, useAppSelector } from '@/src/hooks/hooks';
import { setSelectedIntervalRange } from '@/src/store/data/data.slice';
import { MONTH_NAMES } from '@/src/constants/constants';

const TimeIntervalPicker = ({
  anchorGroupRef,
  earliestRecordDate,
  latestRecordDate,
}: {
  anchorGroupRef: React.RefObject<HTMLDivElement | null>;
  earliestRecordDate: Date;
  latestRecordDate: Date;
}) => {
  const dispatch = useAppDispatch();
  const pickerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [anchorWidth, setAnchorWidth] = useState<number>(0);
  const selectedIntervalRange: IntervalRange = useAppSelector(
    (state) => state.data.selectedIntervalRange,
  );
  const [intervalDisplayText, setIntervalDisplayText] =
    useState('Current Month');

  useEffect(() => {
    setIntervalDisplayText(formatLabel(selectedIntervalRange));
    // }
  }, [selectedIntervalRange]);

  const toggleOpen = () => {
    if (!open && anchorGroupRef.current) {
      setAnchorWidth(anchorGroupRef.current.getBoundingClientRect().width);
      setOpen((prev) => !prev);
      return;
    }
    setOpen(false);
  };
  const close = () => setOpen(false);

  const formatLabel = (range: IntervalRange) => {
    const sameMonth = range.start?.getMonth() === range.end?.getMonth();
    const sameYear = range.start?.getFullYear() === range.end?.getFullYear();

    if (sameMonth && sameYear) {
      return `${MONTH_NAMES[range.start?.getMonth() ?? 0]} ${range.start?.getDate()} – ${MONTH_NAMES[range.start?.getMonth() ?? 0]} ${range.end?.getDate()}`;
    }

    return `${MONTH_NAMES[range.start?.getMonth() ?? 0]} ${range.start?.getDate()} – ${
      MONTH_NAMES[range.end?.getMonth() ?? 0]
    } ${range.end?.getDate()}`;
    // }
  };

  const handleSelect = (range: IntervalRange) => {
    dispatch(setSelectedIntervalRange(range));
    setIntervalDisplayText(formatLabel(range));
    close();
  };

  return (
    <View className='flex flex-1 h-7 items-center justify-center rounded-md shadow-sm mx-2'>
      <div ref={pickerRef} className='flex flex-1 w-full'>
        <Pressable
          className='flex w-full flex-row justify-between items-center px-2'
          onPress={toggleOpen}
        >
          {(state) => {
            const { pressed } = state;
            const hovered = (state as any).hovered;

            return (
              <>
                <Text
                  className='text-sm font-jetbrains-600'
                  style={{
                    color: hovered ? 'rgba(0,0,0,0.95)' : 'rgba(0,0,0,0.65)',
                    fontSize: pressed ? 13 : 14,
                  }}
                >
                  {intervalDisplayText}
                </Text>
                <MaterialCommunityIcons
                  name={'calendar'}
                  size={pressed ? 18 : 20}
                  color={hovered ? 'rgba(0,0,0,0.95)' : 'rgba(0,0,0,0.65)'}
                />
              </>
            );
          }}
        </Pressable>
      </div>

      {open && pickerRef.current && (
        <TimeIntervalDropdown
          anchorEl={pickerRef.current}
          anchorGroupEl={anchorGroupRef}
          anchorWidth={anchorWidth}
          onSelect={handleSelect}
          onClose={close}
          earliestRecordDate={earliestRecordDate}
          latestRecordDate={latestRecordDate}
        />
      )}
    </View>
  );
};

export default TimeIntervalPicker;
