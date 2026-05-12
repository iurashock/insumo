import { View, Text, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/hooks/hooks';
import { Entry, Category } from '@/src/constants/types';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { FALLBACK_CATEGORY } from '@/src/constants/constants';
import { setSelectedEntryId } from '@/src/store/slices/data.slice';
import EntryListButton from './EntryListButton';

const DetailsCard = () => {
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] =
    useState<Category>(FALLBACK_CATEGORY);
  const [editMode, setEditMode] = useState(false);

  const selectedEntryId = useAppSelector((state) => state.data.selectedEntryId);
  const selectedEntry = useAppSelector(
    (state) => state.data.allEntriesList,
  ).find((entry) => entry.id === selectedEntryId);
  const categories = useAppSelector((state) => state.categories.items);

  useEffect(() => {
    if (selectedEntry) {
      const temp_category = categories.find(
        (category) => category.id === selectedEntry.categoryId,
      );
      setSelectedCategory(temp_category ?? FALLBACK_CATEGORY);
    }
  }, [selectedEntry]);

  useEffect(() => {
    setEditMode(false);
  }, [selectedEntryId]);

  const handleBackAction = () => {
    if (editMode) {
      setEditMode(false);
    } else {
      dispatch(setSelectedEntryId(''));
    }
  };

  const handleEditAction = () => {
    if (editMode) {
      // submit changes
      setEditMode(false);
    } else {
      // enter edit mode
      setEditMode(true);
    }
  };

  if (selectedEntryId) {
    return (
      <View className='w-full h-full overflow-hidden'>
        {/* STYLED HEADER */}
        <View
          className='w-full h-24 pt-4 px-4 flex flex-col justify-between items-center'
          style={{ backgroundColor: selectedCategory.color }}
        >
          <View className='w-full h-6 flex flex-row justify-between items-center'>
            <Pressable onPress={handleBackAction}>
              <MaterialCommunityIcons
                name='keyboard-backspace'
                size={24}
                color={editMode ? 'white' : 'rgba(255, 255, 255, 0.3)'}
              />
            </Pressable>
            <Text className='font-jetbrains-400 text-base color-white'>
              {editMode && 'Edit'} {selectedCategory.name}
            </Text>
            <Pressable onPress={handleEditAction}>
              <MaterialCommunityIcons
                name={editMode ? 'content-save' : 'receipt-text-edit'}
                size={24}
                color={'white'}
              />
            </Pressable>
          </View>
          <View className='w-full h-12 flex flex-row justify-center items-center'>
            <MaterialCommunityIcons
              name={selectedCategory.icon}
              size={40}
              color={'white'}
            />
            <View className=' pl-4 flex flex-1 flex-row justify-between items-center'>
              <Text
                className='font-jetbrains-600 text-base color-white'
                // style={{
                //   color:
                //     selectedCategory.type == 'saving'
                //       ? '#3285F3'
                //       : selectedCategory.type == 'income'
                //         ? '#26A86D'
                //         : selectedCategory.type == 'expense'
                //           ? '#FE1684'
                //           : 'black',
                // }}
              >
                {selectedCategory.type}
              </Text>
              <Text className='font-jetbrains-400 color-white text-xl'>
                {selectedEntry?.amount} RON
              </Text>
            </View>
          </View>
        </View>
        {/* MAIN CONTENT */}
        <View className='flex w-full h-full p-4 flex-col justify-start items-center'>
          <View className='w-full flex flex-row justify-between items-center'>
            <Text className='font-jetbrains-400 color-black text-base'>
              Wallet
            </Text>
            <Text className='font-jetbrains-400 color-black text-base'>
              {selectedEntry?.walletId}
            </Text>
          </View>
          <View className='w-full flex flex-row justify-between items-center'>
            <Text className='font-jetbrains-400 color-black text-base'>
              Date
            </Text>
            <Text className='font-jetbrains-400 color-black text-base'>
              {selectedEntry?.entryDate}
            </Text>
          </View>
          <View className='w-full flex flex-col justify-center items-start'>
            <Text className='font-jetbrains-400 color-black text-base'>
              Comment:
            </Text>
            <Text className='font-jetbrains-400 color-black text-base'>
              {selectedEntry?.comment}
            </Text>
          </View>
          <Pressable className='w-[50%] h-7 rounded-md bg-red-600 justify-center items-center'>
            <Text className='font-jetbrains-400 color-white text-base'>
              Delete
            </Text>
          </Pressable>
        </View>
      </View>
    );
  } else {
    return (
      <View className='flex flex-1 justify-center items-center bg-white'>
        <View
          style={{
            position: 'absolute',
            width: '130%',
            height: 1,
            backgroundColor: '#e5e7eb',
            transform: [{ rotate: '50deg' }],
          }}
        />
        <View
          style={{
            position: 'absolute',
            width: '130%',
            height: 1,
            backgroundColor: '#e5e7eb',
            transform: [{ rotate: '-50deg' }],
          }}
        />

        <View className='px-4 py-4 bg-white'>
          <Text className='font-jetbrains-400 text-base color-gray-400'>
            No item selected
          </Text>
        </View>
      </View>
    );
  }
};

export default DetailsCard;
