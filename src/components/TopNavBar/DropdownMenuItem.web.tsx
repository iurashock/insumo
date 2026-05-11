import React from 'react';
import { View, Text } from 'react-native';
import { HrefObject, Link } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const DropdownMenuItem = ({
  title,
  iconName,
  danger,
  href,
  onClick,
}: {
  title: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  danger?: boolean;
  href: string;
  onClick: () => void;
}) => {
  return (
    <Link href={href}>
      <div
        className='flex-row justify-start items-center px-2 py-1 cursor-pointer rounded-md'
        onClick={onClick}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#f3f4f6')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        <MaterialCommunityIcons
          name={iconName}
          color={danger ? '#dc2626' : '#111827'}
          size={20}
        />
        <Text
          className={`font-jetbrains-400 text-base text-[${danger ? '#dc2626' : '#111827'}] pl-2`}
        >
          {title}
        </Text>
      </div>
    </Link>
  );
};

export default DropdownMenuItem;
