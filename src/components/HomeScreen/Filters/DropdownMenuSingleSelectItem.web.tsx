import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Checkbox } from 'expo-checkbox';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const DropdownMenuSingleSelectItem = <T extends string>({
  value,
  id,
  label,
  onSelect,
  showIcons,
}: {
  id: T;
  value: T;
  label: string;
  onSelect: (id: T) => void;
  showIcons: boolean;
}) => {
  return (
    <div
      className={`flex flex-1 flex-row justify-start items-center px-1 py-1 rounded ${value === id ? 'bg-gray-200' : 'bg-gray-50 hover:bg-gray-100'} hover:cursor-pointer`}
      onClick={() => {
        onSelect(id);
      }}
    >
      {showIcons && (
        <MaterialCommunityIcons
          name={'checkbox-blank-circle'}
          size={8}
          color={value === id ? 'black' : 'rgba(0,0,0,0.2)'}
        />
      )}
      <Text className='pl-2 font-jetbrains-300 text-sm'>{label}</Text>
    </div>
  );
};

export default DropdownMenuSingleSelectItem;
