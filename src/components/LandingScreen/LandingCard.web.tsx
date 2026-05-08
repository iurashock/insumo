import { View, Text } from 'react-native';
import React, { ReactNode } from 'react';

const LoginCard = ({ children }: { children: ReactNode }) => {
  return (
    <View className='w-[30%] min-h-[50%] rounded-lg shadow-md bg-white opacity-85 pt-10 pb-2 px-5'>
      {/* // <View
    //   className='w-[30%] h-[50%] flex-col justify-evenly items-center rounded-xl shadow-lg border border-white/30'
    //   style={{
    //     backgroundColor: 'rgba(255, 255, 255, 0.08)',
    //     ...({
    //       backdropFilter: 'blur(16px)',
    //       WebkitBackdropFilter: 'blur(16px)',
    //     } as any),
    //   }}
    // > */}
      {children}
    </View>
  );
};

export default LoginCard;
