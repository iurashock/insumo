import { Slot, Redirect } from 'expo-router';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

export default function AuthLayoutWeb() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.status === 'authenticated',
  );

  if (!isAuthenticated) {
    return <Redirect href='/login' />;
  }

  return <Slot />;
}
