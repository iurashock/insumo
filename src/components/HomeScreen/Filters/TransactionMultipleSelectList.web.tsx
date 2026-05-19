import { View, Text, Pressable } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { OPTIONS } from '@/src/constants/constants';
import DropdownMenuShell from './DropdownMenuShell.web';
import DropdownMenuMultipleSelectItem from './DropdownMenuMultipleSelectItem.web';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TRANSACTION_MULTIPLE_PICK_OPTIONS } from '@/src/constants/types';

const TransactionMultipleSelectList = ({
  width,
  value,
  options,
  label,
  showIcons,
  onSelect,
  iconName,
}: {
  width?: number;
  value: TRANSACTION_MULTIPLE_PICK_OPTIONS;
  onSelect: (selectedOptions: TRANSACTION_MULTIPLE_PICK_OPTIONS) => void;
  options: { id: string; label: string }[];
  label: string;
  showIcons?: boolean;
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    if (!open) {
      setOpen((prev) => !prev);
      return;
    }
    setOpen(false);
  };

  const toggleValue = (id: string) => {
    let newState: TRANSACTION_MULTIPLE_PICK_OPTIONS;

    const allCategoryIds = options
      .map((o) => o.id)
      .filter((id) => id !== 'all_options');

    if (id === 'all_options') {
      if (value.all_options) {
        newState = {
          all_options: false,
          pickedOptions: [],
        };
      } else {
        newState = {
          all_options: true,
          pickedOptions: allCategoryIds,
        };
      }
    } else {
      const current = value.pickedOptions ?? [];

      const newValues = current.includes(id)
        ? current.filter((v) => v !== id)
        : [...current, id];

      newState = {
        all_options: newValues.length === options.length - 1,
        pickedOptions: newValues,
      };
    }

    onSelect(newState);
  };

  return (
    <View
      className={`flex-1 flex h-7 items-center justify-center rounded-md shadow-sm mx-2`}
      style={{ minWidth: width ?? '100%' }}
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
                      paddingLeft: iconName ? 4 : 0,
                      color: hovered ? 'rgba(0,0,0,0.95)' : 'rgba(0,0,0,0.65)',
                      fontSize: pressed ? 14 : 14,
                      maxWidth: width,
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
          <div className='sticky top-0 z-10 bg-white border-b border-gray-200'>
            <DropdownMenuMultipleSelectItem
              selected={value.all_options}
              id={'all_options'}
              label={options[0].label}
              onSelect={() => toggleValue('all_options')}
            />
          </div>
          <div className='max-h-[240px] overflow-y-auto'>
            {options &&
              options
                .filter((opt) => opt.id !== 'all_options')
                .map((opt) => {
                  return (
                    <DropdownMenuMultipleSelectItem
                      key={opt.id}
                      selected={
                        value.all_options
                          ? true
                          : (value.pickedOptions?.includes(opt.id) ?? false)
                      }
                      id={opt.id}
                      label={opt.label}
                      onSelect={toggleValue}
                      showIcon={showIcons}
                    />
                  );
                })}
          </div>
        </DropdownMenuShell>
      )}
    </View>
  );
};

export default TransactionMultipleSelectList;
