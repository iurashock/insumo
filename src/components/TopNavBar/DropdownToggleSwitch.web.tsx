import React from 'react';
import { View, Text, Pressable, Switch } from 'react-native';
import { HrefObject, Link } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const DropdownToggleSwitch = ({
  title,
  iconNameActive,
  iconNameInactive,
  isActive,
  onClick,
}: {
  title: string;
  iconNameActive: keyof typeof MaterialCommunityIcons.glyphMap;
  iconNameInactive: keyof typeof MaterialCommunityIcons.glyphMap;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <div className='w-full flex flex-row justify-between items-center px-2 py-1 rounded-md'>
      <View className='flex flex-row justify-start items-center'>
        <MaterialCommunityIcons
          name={!isActive ? iconNameActive : iconNameInactive}
          color={'#111827'}
          size={20}
        />
        <Text
          className={`font-jetbrains-400 text-base text-['#111827']} pl-2 `}
        >
          {title}
        </Text>
      </View>
      <Switch className='' onValueChange={onClick} value={isActive} />
    </div>
  );
};

export default DropdownToggleSwitch;
