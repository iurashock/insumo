import { View, Text, Pressable } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const FunctionalButton = ({
  danger,
  onPress,
}: {
  danger?: boolean;
  onPress: () => void;
}) => {
  return (
    <Pressable
      className={`w-full flex h-7 flex-row justify-between items-center `}
      onPress={onPress}
    >
      {(state) => {
        const { pressed } = state;
        const hovered = (state as any).hovered;

        return (
          <>
            <Text
              className={`font-jetbrains-800 text-xs align-middle text-center 
                ${danger ? (hovered ? 'color-[rgba(255,0,0,0.75)]' : 'color-[rgba(255,0,0,0.40)]') : hovered ? 'color-[rgba(0,0,0,0.75)]' : 'color-[rgba(0,0,0,0.40)]'}
                `}
              numberOfLines={1}
            >
              {danger ? 'Clear filters' : 'Refresh data'}
            </Text>

            <MaterialCommunityIcons
              name='close'
              size={pressed ? 16 : 24}
              color={
                danger
                  ? hovered
                    ? 'rgba(255,0,0,0.75)'
                    : 'rgba(255,0,0,0.40)'
                  : hovered
                    ? 'rgba(0,0,0,0.70)'
                    : 'rgba(0,0,0,0.40)'
              }
            />
          </>
        );
      }}
    </Pressable>
  );
};

export default FunctionalButton;
