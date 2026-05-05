import { View, Button, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'expo-router';
import type { AppDispatch, RootState } from '../store';
import { loginAsUser } from '@/src/store/thunks/loginAsUser';

export default function LoginScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.status === 'authenticated',
  );

  if (isAuthenticated) {
    return <Redirect href='/' />;
  }

  return (
    <View className='flex-1 items-center justify-center gap-4 pt-[200px]'>
      <Text className='text-xl'>Login page</Text>

      <Button
        title='Login as John Smith'
        onPress={() => dispatch(loginAsUser({ userId: 123456 }))}
      />

      <Button
        title='Login as Michael Bertoldo'
        onPress={() => dispatch(loginAsUser({ userId: 987654 }))}
      />
    </View>
  );
}
