import { View, Text } from 'react-native';
import React from 'react';

const FooterBar = () => {
  return (
    <View className='w-full h-4 border-t border-t-gray-500 flex-row justify-between items-start px-2'>
      <Text className='color-gray-600'>Last sync: 13:50pm</Text>
      <Text className='color-gray-600'>Insumo v1.0.1p</Text>
    </View>
  );
};

export default FooterBar;
