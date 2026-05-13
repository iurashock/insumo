import React, { useRef, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Link, usePathname } from 'expo-router';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import DropDownMenu from './DropdownMenu.web';
import Logo3 from '@/assets/logo_recolor.png';
import { TOP_NAVBAR_HEIGHT } from '@/src/constants/constants';

const TopNavBar = () => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    if (!iconRef.current) return;
    setOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <View
      className={`fixed top-0 left-0 right-0 z-50 flex flex-row justify-between items-center w-full h-[${TOP_NAVBAR_HEIGHT}] bg-green-50 px-5`}
    >
      <View className='flex justify-center items-center'>
        <Link
          href='/'
          className='px-2 flex flex-row justify-center items-center'
        >
          <Image
            source={Logo3}
            style={{
              width: TOP_NAVBAR_HEIGHT + 5,
              height: TOP_NAVBAR_HEIGHT + 5,
            }}
            resizeMode='contain'
          />
          <Text className='text-3xl font-jetbrains-700'>insumo</Text>
        </Link>
      </View>
      <View className='flex-1 flex flex-row justify-center gap-10 items-center'>
        <Link href='/dashboard'>
          <Text
            className={
              pathname === '/dashboard'
                ? 'text-green-500 border-b-4 border-green-500 font-jetbrains-700 text-2xl px-3 py-1 pb-3'
                : 'text-gray-500 font-jetbrains-700 text-2xl px-3 py-1'
            }
          >
            Dashboard
          </Text>
        </Link>
        <Link href='/networth'>
          <Text
            className={
              pathname === '/networth'
                ? 'text-green-500 border-b-4 border-green-500 font-jetbrains-700 text-2xl px-3 py-1 pb-3'
                : 'text-gray-500 font-jetbrains-700 text-2xl px-3 py-1'
            }
          >
            Net Worth Tracking
          </Text>
        </Link>
      </View>
      {/* <View>
        <Link href='/settings'>
          <MaterialCommunityIcons
            name='cog'
            size={40}
            color={pathname === '/settings' ? '#22c55e' : '#6b7280'}
          />
        </Link>
      </View> */}

      <View className='px-2'>
        <div ref={iconRef}>
          <MaterialCommunityIcons
            name='cog'
            size={40}
            onClick={toggleMenu}
            style={{ cursor: 'pointer' }}
          />
        </div>

        {open && iconRef.current && (
          <DropDownMenu anchorEl={iconRef.current} onClose={closeMenu} />
        )}
      </View>
    </View>
  );
};

export default TopNavBar;
