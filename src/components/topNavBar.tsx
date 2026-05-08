import React, { useRef, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Link, usePathname } from 'expo-router';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import UserMenu from './UserMenu.web';
import Logo3 from '../../assets/logo_recolor.png';

const TopNavBar = () => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    if (!iconRef.current) return;
    setOpen(true);
  };

  return (
    <View className='fixed top-0 left-0 right-0 z-50 flex flex-row justify-between items-center w-full h-20 bg-green-50 px-[10%]'>
      <View className='flex justify-center items-center'>
        <Link
          href='/'
          className='px-2 flex flex-row justify-center items-center'
        >
          <Image
            source={Logo3}
            style={{ width: 90, height: 90 }}
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
                ? 'text-green-500 border-b-4 border-green-500 font-jetbrains-700 text-2xl px-3 py-1 pb-5'
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
                ? 'text-green-500 border-b-4 border-green-500 font-jetbrains-700 text-2xl px-3 py-1 pb-5'
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

      <View className='px-6'>
        <div ref={iconRef}>
          <MaterialCommunityIcons
            name='cog'
            size={40}
            onClick={openMenu}
            style={{ cursor: 'pointer' }}
          />
        </div>

        {open && iconRef.current && (
          <UserMenu
            anchorRect={iconRef.current.getBoundingClientRect()}
            onClose={() => setOpen(false)}
          />
        )}
      </View>
    </View>
  );
};

export default TopNavBar;
