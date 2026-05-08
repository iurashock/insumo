import { Slot, Redirect } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import TopNavBar from '@/src/components/TopNavBar';
import React from 'react';

export default function AuthLayoutWeb() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.status === 'authenticated',
  );

  if (!isAuthenticated) {
    return <Redirect href='/landing' />;
  }

  return (
    <React.Fragment>
      <TopNavBar />
      <Slot />
    </React.Fragment>
  );
}
