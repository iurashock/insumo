import React from 'react';
import { View, Text } from 'react-native';

import { ENTRY_LIST_HEADER_MIN_HEIGHT } from '@/src/constants/constants';

const EntryListSeparator = ({
  date,
  runningTotal,
}: {
  date: string;
  runningTotal: number;
}) => {
  return (
    <View
      className='w-full px-2 py-2 bg-gray-200 flex-row items-center border-b-[1px] border-black justify-between z-10'
      style={{ height: ENTRY_LIST_HEADER_MIN_HEIGHT }}
    >
      <Text className='text-sm font-jetbrains-700 text-gray-800'>{date}</Text>
      {runningTotal && (
        <Text className='text-sm font-jetbrains-700 text-gray-800'>
          {runningTotal > 0
            ? '+' + runningTotal + ' RON'
            : runningTotal + ' RON'}
        </Text>
      )}
    </View>
  );
};

export default EntryListSeparator;
