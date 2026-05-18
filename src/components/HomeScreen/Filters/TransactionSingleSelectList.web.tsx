import { View, Text, Pressable } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { OPTIONS } from '@/src/constants/constants';
import DropdownMenuShell from './DropdownMenuShell.web';
import TransactionDropdownMenuItem from './TransactionDropdownMenuItem.web';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const TransactionSingleSelectList = ({
  width,
  onClose,
  options,
  label,
  showIcons,
  onSelect,
  iconName,
}: {
  width?: number;
  onClose: () => void;
  onSelect: (id: string) => void;
  options: { value: string; label: string }[];
  label: string;
  showIcons?: boolean;
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    console.log(iconName);

    if (!open) {
      setOpen((prev) => !prev);
      return;
    }
    setOpen(false);
  };

  return (
    <View
      className={`flex-1 flex h-7 items-center justify-center rounded-md shadow-sm mx-2`}
      style={{ maxWidth: width ?? '100%' }}
    >
      <div ref={ref} className='flex flex-1 w-full'>
        <Pressable
          className='flex w-full flex-row justify-between items-center px-2'
          onPress={toggleOpen}
        >
          {(state) => {
            const { pressed } = state;
            const hovered = (state as any).hovered;

            return (
              <View className='w-full flex flex-row justify-between items-center'>
                <View className='flex-1 flex flex-row justify-start items-center'>
                  {showIcons && (
                    <MaterialCommunityIcons
                      name={iconName}
                      size={pressed ? 18 : 20}
                      color={hovered ? 'rgba(0,0,0,0.95)' : 'rgba(0,0,0,0.65)'}
                    />
                  )}
                  <Text
                    className='text-sm font-jetbrains-600'
                    style={{
                      color: hovered ? 'rgba(0,0,0,0.95)' : 'rgba(0,0,0,0.65)',
                      fontSize: pressed ? 13 : 14,
                    }}
                  >
                    {label}
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name='arrow-down'
                  size={pressed ? 18 : 20}
                  color={hovered ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.25)'}
                />
              </View>
            );
          }}
        </Pressable>
      </div>
      {open && (
        <DropdownMenuShell
          anchorEl={ref}
          width={ref.current?.getBoundingClientRect().width}
          onClose={() => setOpen(false)}
        >
          {options &&
            options.map((opt) => {
              return (
                <TransactionDropdownMenuItem
                  itemKey={opt.value}
                  itemValue={opt.label}
                  onSelect={onSelect}
                  iconName='circle'
                />
              );
            })}
        </DropdownMenuShell>
      )}
    </View>
  );
};

export default TransactionSingleSelectList;
