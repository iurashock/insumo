import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import DropdownMenuItem from './DropdownMenuItem.web';
import { TOP_NAVBAR_HEIGHT } from '@/src/constants/constants';
import DropdownToggleSwitch from './DropdownToggleSwitch.web';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '@/src/store/slices/settings.slice';
import { RootState } from '@/src/store';
import { logout } from '@/src/store/slices/auth.slice';
import { useAppDispatch, useAppSelector } from '@/src/hooks/hooks';

export default function UserMenu({
  anchorRect,
  onClose,
}: {
  anchorRect: DOMRect;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isActive: boolean = useAppSelector((state) => state.settings.darkMode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
  };

  const handleLogout = () => {
    dispatch(logout());
    onClose();
  };

  return createPortal(
    <div
      ref={ref}
      className={`px-2 py-2 w-[250px] z-50 absolute bg-white rounded-lg shadow-md`}
      style={{
        top: anchorRect.bottom + 10,
        left: anchorRect.right - 250,
      }}
    >
      <DropdownMenuItem
        href='./settings'
        title='Settings'
        iconName='cog'
        onClick={onClose}
      />
      <DropdownMenuItem
        href='.'
        title='Support'
        iconName='human'
        onClick={onClose}
      />
      <DropdownToggleSwitch
        title='Dark mode'
        iconNameActive='white-balance-sunny'
        iconNameInactive='star-crescent' //'weather-night'
        isActive={isActive}
        onClick={handleDarkModeToggle}
      />
      <div style={{ height: 1, background: '#e5e7eb', margin: '6px 0' }} />
      <DropdownMenuItem
        href='.'
        title='Log out'
        iconName='logout'
        onClick={handleLogout}
        danger
      />
    </div>,
    document.body,
  );
}
