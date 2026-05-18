import { View, Text } from 'react-native';
import React from 'react';

const ResetFiltersButton = () => {
  return (
    <View
      className={`w-24 flex h-7 items-center justify-center rounded-md shadow-sm mx-2 bg-red-500 hover:bg-red-600`}
    >
      <Text> Reset filters </Text>
    </View>
  );
};

export default ResetFiltersButton;
