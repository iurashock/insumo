import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { logout } from '../../store/auth/auth.slice';

const settings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [dark, setDark] = useState(false);
  useTheme(dark);

  const user = useSelector((state: RootState) => state.user);

  return (
    <View className='justify-center items-center flex-1 p-4 bg-white dark:bg-black pt-20'>
      <Text className='text-black font-jetbrains-500 text-3xl dark:text-white mb-6'>
        {user.userId}: {user.name}
      </Text>
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
