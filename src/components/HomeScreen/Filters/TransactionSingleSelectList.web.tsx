import { View, Text, Pressable } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { OPTIONS, TRANSACTION_TYPE_OPTIONS } from '@/src/constants/constants';
import DropdownMenuShell from './DropdownMenuShell.web';
import DropdownMenuSingleSelectItem from './DropdownMenuSingleSelectItem.web';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TRANSACTION_TYPE_PICK_OPTIONS } from '@/src/constants/types';

const TransactionSingleSelectList = <T extends string>({
  value,
  width,
  onClose,
  options,
  label,
  showIcons,
  onSelect,
  iconName,
}: {
  value: T;
  width?: number;
  onClose: () => void;
  onSelect: (id: T) => void;
  options: { id: T; label: string }[];
  label: string;
  showIcons?: boolean;
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    // console.log(iconName);

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
                  {showIcons && iconName && (
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
                      fontSize: pressed ? 14 : 14,
                    }}
                    numberOfLines={1}
                  >
                    {label}
                  </Text>
                </View>
                <MaterialIcons
                  name='arrow-drop-down'
                  size={24}
                  color={hovered ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.25)'}
                  style={
                    {
                      transform: [{ rotate: open ? '180deg' : '0deg' }],
                      transition:
                        'transform 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                    } as any
                  }
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
                <DropdownMenuSingleSelectItem
                  key={opt.id}
                  value={value}
                  id={opt.id}
                  label={opt.label}
                  onSelect={(id) => {
                    onSelect(id);
                    setOpen(false);
                  }}
                  showIcons={showIcons ?? false}
                />
              );
            })}
        </DropdownMenuShell>
      )}
    </View>
  );
};

export default TransactionSingleSelectList;
