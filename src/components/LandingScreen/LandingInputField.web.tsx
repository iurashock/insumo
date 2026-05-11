import { View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';

const LoginInputField = ({
  type,
  value,
  error,
  onChange,
  onSubmit,
}: {
  type: 'email' | 'password' | 'confirm-password';
  value: string;
  error?: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
}) => {
  const [focused, SetFocused] = useState(false);
  const label =
    type === 'email'
      ? 'Email'
      : type === 'password'
        ? 'Password'
        : 'Confirm Password';
  const hasError = Boolean(error);

  return (
    <View className='w-[80%] relative'>
      <View
        className={`rounded-md border transition-colors ${
          focused
            ? error
              ? 'border-red-500'
              : 'border-gray-800'
            : error
              ? 'border-red-500 '
              : 'border-gray-400'
        }`}
      >
        <Text
          className={`absolute -top-2 left-2 bg-white px-1 text-xs font-jetbrains-500 text-gray-600 z-10 ${
            focused
              ? error
                ? 'text-red-500'
                : 'text-gray-800'
              : error
                ? 'text-red-500 '
                : 'text-gray-400'
          }`}
        >
          {label}
        </Text>
        <TextInput
          className={`w-full text-base font-jetbrains-500 text-gray-800 py-2 px-3 rounded-md focus:outline-none`}
          secureTextEntry={type === 'password' || type === 'confirm-password'}
          onFocus={() => SetFocused(true)}
          onBlur={() => SetFocused(false)}
          autoCapitalize='none'
          placeholder=''
          value={value}
          onChangeText={onChange}
          // returnKeyType={type === 'password' ? 'done' : 'next'}
          onSubmitEditing={onSubmit}
        />
      </View>
      <View className='min-h-[16px] mt-1'>
        {hasError && (
          <Text className='text-xs text-red-500 font-jetbrains-300'>
            {error}
          </Text>
        )}
      </View>
    </View>
  );
};

export default LoginInputField;
