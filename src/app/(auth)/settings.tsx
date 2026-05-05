import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { logout } from '../../store/slices/auth.slice';

const settings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [dark, setDark] = useState(false);
  useTheme(dark);

  return (
    <View className='justify-center items-center flex-1 p-4 bg-white dark:bg-black pt-20'>
      <Text className='text-black dark:text-white mb-6'>Dark mode toggle</Text>
      <Pressable
        onPress={() => setDark(!dark)}
        className='px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded'
      >
        <Text className='text-black dark:text-white'>Switch Theme</Text>
      </Pressable>
      <Pressable
        onPress={() => dispatch(logout())}
        className='px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded'
      >
        <Text className='text-black dark:text-white'>Logout</Text>
      </Pressable>
    </View>
  );
};

export default settings;
