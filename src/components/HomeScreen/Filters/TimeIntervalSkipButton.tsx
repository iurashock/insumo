import { Pressable } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const TimeIntervalSkipButton = ({
  left,
  onPress,
}: {
  left?: boolean;
  onPress: () => void;
}) => {
  return (
    <Pressable
      className='w-7 h-7 rounded-md justify-center items-center shadow-sm hover:bg-gray-100'
      style={{ paddingLeft: !left ? 2 : 0, paddingRight: left ? 2 : 0 }}
      onPress={onPress}
    >
      {(state) => {
        const { pressed } = state;
        const hovered = (state as any).hovered;

        return (
          <MaterialCommunityIcons
            name={left ? 'less-than' : 'greater-than'}
            size={pressed ? 16 : 20}
            color={hovered ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.35)'}
          />
        );
      }}
    </Pressable>
  );
};

export default TimeIntervalSkipButton;
