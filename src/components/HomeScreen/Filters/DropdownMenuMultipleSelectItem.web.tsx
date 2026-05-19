import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Checkbox } from 'expo-checkbox';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAppSelector } from '@/src/hooks/hooks';
import { Category } from '@/src/constants/types';
import { FALLBACK_CATEGORY } from '@/src/constants/constants';

const DropdownMenuMultipleSelectItem = <T extends string>({
  selected,
  id,
  label,
  onSelect,
  showIcon,
}: {
  id: T;
  selected: boolean;
  label: string;
  onSelect: (id: T) => void;
  showIcon?: boolean;
}) => {
  const category: Category =
    useAppSelector((state) => state.categories.items).find(
      (cat) => cat.id === id,
    ) ?? FALLBACK_CATEGORY;
  return (
    <div
      className={`flex flex-1 flex-row justify-start items-center px-1 py-1 bg-gray-50 hover:bg-gray-100 hover:cursor-pointer
        ${id === 'all_options' && 'border-b border-b-gray-300'}
        `}
      onClick={() => {
        onSelect(id);
      }}
    >
      <Checkbox
        value={selected}
        onValueChange={() => {
          onSelect(id);
        }}
      />
      {showIcon && (
        <View
          className='w-5 h-5 rounded-full flex items-center justify-center ml-1'
          style={{ backgroundColor: category.color }}
        >
          <MaterialCommunityIcons
            name={category.icon}
            size={13}
            color={'white'}
          />
        </View>
      )}
      <Text className='pl-1 font-jetbrains-300 text-sm'>{label}</Text>
    </div>
  );
};

export default DropdownMenuMultipleSelectItem;
