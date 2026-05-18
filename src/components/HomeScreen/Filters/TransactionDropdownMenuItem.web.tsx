import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Checkbox } from 'expo-checkbox';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const TransactionDropdownMenuItem = ({
  itemKey,
  itemValue,
  onSelect,
  iconName,
}: {
  itemKey: string;
  itemValue: string;
  onSelect: (id: string) => void;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
}) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <View className='flex w-full flex-row justify-between items-center px-2 py-1'>
      <Checkbox
        value={isChecked}
        onValueChange={() => {
          onSelect(itemKey);
        }}
      />
      <Text>{itemValue}</Text>
    </View>
  );
};

export default TransactionDropdownMenuItem;
