import { View, Text, TextInput } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const TransactionSearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const inputRef = useRef<TextInput | null>(null);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => clearTimeout(id);
  }, [localValue]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <View className='flex flex-row items-center h-7 px-2 mx-2 rounded-md shadow-sm bg-white min-w-[25%] flex-1'>
      <MaterialCommunityIcons
        name='magnify'
        size={16}
        color='rgba(0,0,0,0.45)'
        onPress={() => {
          inputRef.current?.focus();
        }}
      />
      <TextInput
        ref={inputRef}
        className='flex-1 ml-2 font-jetbrains-300 text-sm outline-none'
        placeholder='Find with keywords...'
        value={localValue}
        onChangeText={setLocalValue}
        autoCorrect={false}
        autoCapitalize='none'
        clearButtonMode='while-editing'
        onKeyPress={(e) => {
          if (e.nativeEvent.key === 'Escape') {
            setLocalValue('');
            onChange('');
            inputRef.current?.blur();
          }
        }}
      />
      {localValue !== '' && (
        <MaterialCommunityIcons
          name='window-close'
          size={16}
          color='rgba(0,0,0,0.45)'
          onPress={() => {
            setLocalValue('');
            onChange('');
          }}
        />
      )}
    </View>
  );
};

export default TransactionSearchBar;
