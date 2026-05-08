import { Text, Pressable } from 'react-native';
import React, { useState } from 'react';

const LoginButton = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  return (
    <Pressable
      className='px-4 py-2 rounded-md bg-green-500 hover:bg-green-600'
      onPress={onPress}
    >
      <Text className='text-white font-jetbrains-500 text-center'>{title}</Text>
    </Pressable>
  );
};

export default LoginButton;
