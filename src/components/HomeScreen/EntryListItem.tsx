import React from 'react';
import { View, Text, Pressable } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { CATEGORIES, FALLBACK_CATEGORY } from '@/src/constants/constants';

const EntryListItem = ({
  id,
  categoryId,
  walletId,
  comment,
  amount,
  onPress,
}: {
  id: string;
  categoryId: string;
  walletId: string;
  comment: string;
  amount: number;
  onPress: (id: string) => void;
}) => {
  const category =
    CATEGORIES.find((c) => c.id === categoryId) || FALLBACK_CATEGORY;

  return (
    <Pressable onPress={() => onPress(id)}>
      <View className='flex w-[100%] h-11 flex-row justify-between items-center px-2 py-1 border-b-[1px] border-black bg-gray-50'>
        <View className='flex-[1] pr-3 items-center justify-center'>
          <View
            className='w-9 h-9 rounded-full items-center justify-center'
            style={{ backgroundColor: category.color }}
          >
            <MaterialCommunityIcons
              name={category.icon}
              size={26}
              color={'white'}
            />
          </View>
        </View>
        <View className='flex-[3] flex-col px-1 justify-center items-start'>
          <Text className='text-xs font-jetbrains-500 w-full' numberOfLines={1}>
            {walletId}
          </Text>
          <Text
            className='text-sx font-jetbrains-500 w-full'
            style={{
              color:
                category.type == 'saving'
                  ? '#3285F3'
                  : category.type == 'income'
                    ? '#26A86D'
                    : category.type == 'expense'
                      ? '#FE1684'
                      : 'black',
            }}
            numberOfLines={1}
          >
            {category.name}
          </Text>
        </View>
        <View className='flex-[6] flex-col px-3 justify-center items-start'>
          <Text className='text-xs font-jetbrains-500 w-full'>Comment</Text>
          <Text className='text-xs font-jetbrains-500 w-full' numberOfLines={1}>
            {comment}
          </Text>
        </View>
        <View className='flex-[2] flex-col px-3 justify-center items-end'>
          {/* <Text className='text-xs font-jetbrains-500'>Amount</Text> */}
          <Text
            className='text-sm font-jetbrains-500'
            style={{
              color:
                category.type == 'saving'
                  ? '#3285F3'
                  : category.type == 'income'
                    ? '#26A86D'
                    : category.type == 'expense'
                      ? '#FE1684'
                      : 'black',
            }}
          >
            {category.name == 'Income' ? '+' : ''}
            {amount} RON
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default EntryListItem;
