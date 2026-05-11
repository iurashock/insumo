import { View, Text, Pressable, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { Redirect } from 'expo-router';
import type { RootState } from '../store';
import { useMemo, useState } from 'react';
import { Svg, Defs, LinearGradient, Stop } from 'react-native-svg';
import LoginCard from '../components/LandingScreen/LandingCard.web';

import SVG1 from '../../assets/SVGs/cash.svg';
import SVG2 from '../../assets/SVGs/cash-hand.svg';
import SVG4 from '../../assets/SVGs/coins.svg';
import SVG6 from '../../assets/SVGs/coins2.svg';
import SVG7 from '../../assets/SVGs/banknote.svg';
import SVG8 from '../../assets/SVGs/briefcase.svg';
import SVG9 from '../../assets/SVGs/moneybag.svg';
import SVG10 from '../../assets/SVGs/money-symbol.svg';
import LoginForm from '../components/LandingScreen/LoginForm.web';
import RegisterForm from '../components/LandingScreen/RegisterForm.web';
import { useAppSelector } from '../hooks/hooks';

const SVGS = [SVG1, SVG2, SVG4, SVG6, SVG7, SVG8, SVG9, SVG10].map(
  (svg: any) => svg?.default ?? svg,
);

const DOODLES = [SVG1, SVG2, SVG4].map((svg: any) => svg?.default ?? svg);

type PatternItem = {
  id: number;
  Icon: React.FC<any>;
  top: number;
  left: number;
  size: number;
  rotate: number;
  opacity: number;
};

type PatternItem1 = {
  id: number;
  Icon: React.FC<any>;
  top: number;
  left: number;
};

function GradientStroke({
  children,
  id,
  isDarkMode,
}: {
  children: React.ReactNode;
  id: string;
  isDarkMode: boolean;
}) {
  return (
    <Svg width='100%' height='100%'>
      <Defs>
        <LinearGradient id={id} x1='0%' y1='0%' x2='100%' y2='100%'>
          <Stop offset='0%' stopColor={isDarkMode ? '#34d399' : '#059669'} />
          <Stop offset='100%' stopColor={isDarkMode ? '#22d3ee' : '#0ea5e9'} />
        </LinearGradient>
      </Defs>

      {children}
    </Svg>
  );
}

export function BackgroundPattern1({ isDarkMode }: { isDarkMode: boolean }) {
  const { width, height } = Dimensions.get('window');

  const items: PatternItem1[] = useMemo(() => {
    const SPACING = 80; // slightly wider than before
    const cols = Math.ceil(width / SPACING);
    const rows = Math.ceil(height / SPACING);

    return Array.from({ length: cols * rows }).map((_, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;

      return {
        id: i,
        Icon: DOODLES[i % DOODLES.length], // deterministic cycling
        top: row * SPACING,
        left: col * SPACING,
      };
    });
  }, [width, height]);

  const strokeColor = isDarkMode
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(0, 0, 0, 0.05)';

  return (
    <View
      className='absolute inset-0 overflow-hidden'
      style={{
        backgroundColor: isDarkMode
          ? '#0f172a' // slate-900
          : '#ffffff',
      }}
    >
      {items.map(({ id, Icon, top, left }) => (
        <View
          key={id}
          style={{
            position: 'absolute',
            top,
            left,
          }}
        >
          <Icon
            width={36}
            height={36}
            stroke={strokeColor}
            strokeWidth={1}
            fill='none'
          />
        </View>
      ))}
    </View>
  );
}

export function BackgroundPattern({ isDarkMode }: { isDarkMode: boolean }) {
  const { width, height } = Dimensions.get('window');

  const items: PatternItem[] = useMemo(() => {
    const SPACING = 80; // distance between icons (controls density)

    const cols = Math.ceil(width / SPACING);
    const rows = Math.ceil(height / SPACING);

    const COUNT = cols * rows;

    return Array.from({ length: COUNT }).map((_, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;

      const Icon = SVGS[Math.floor(Math.random() * SVGS.length)];

      return {
        id: i,
        Icon,
        top: row * SPACING + Math.random() * 20, // jitter
        left: col * SPACING + Math.random() * 20,
        size: 30 + Math.random() * 28,
        rotate: Math.random() * 360,
        opacity: 0.05 + Math.random() * 0.05,
      };
    });
  }, [width, height]);

  return (
    <View
      className='absolute inset-0 overflow-hidden'
      style={{
        backgroundColor: isDarkMode
          ? 'rgba(17, 24, 39, 0.95)' // near-slate-900
          : 'rgba(255, 255, 255, 0.95)',
      }}
    >
      {items.map(({ id, Icon, top, left, size, rotate, opacity }) => (
        <View
          key={id}
          style={{
            position: 'absolute',
            top,
            left,
            opacity,
            transform: [{ rotate: `${rotate}deg` }],
          }}
        >
          <GradientStroke id={`grad-${id}`} isDarkMode={isDarkMode}>
            <Icon width={size} height={size} stroke='white' strokeWidth={1} />
          </GradientStroke>
        </View>
      ))}
    </View>
  );
}

export default function LandingScreen() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const isDarkMode: boolean = useAppSelector(
    (state) => state.settings.darkMode,
  );

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.status === 'authenticated',
  );

  if (isAuthenticated) {
    return <Redirect href='/' />;
  }

  return (
    <View className='flex-1 relative overflow-hidden'>
      <View className='absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500' />
      <BackgroundPattern isDarkMode={isDarkMode} />

      <View className='flex-1 items-center justify-center z-10'>
        <LoginCard>
          {mode === 'login' ? <LoginForm /> : <RegisterForm />}

          <View className='flex-row items-center justify-center w-full'>
            <Text className='font-jetbrains-i-300 text-xs px-2'>
              {mode === 'login'
                ? "Don't have an account?"
                : 'Already got an account?'}
            </Text>
            <Pressable
              className='px-2s'
              onPress={() =>
                setMode((current) =>
                  current === 'login' ? 'register' : 'login',
                )
              }
            >
              <Text className='font-jetbrains-i-500 text-xs'>
                {mode === 'login' ? 'Register here' : 'Log in'}
              </Text>
            </Pressable>
          </View>
        </LoginCard>
      </View>
    </View>
  );
}
