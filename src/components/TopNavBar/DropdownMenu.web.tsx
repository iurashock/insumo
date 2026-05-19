import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import DropdownMenuItem from './DropdownMenuItem.web';
import DropdownToggleSwitch from './DropdownToggleSwitch.web';
import { toggleDarkMode } from '@/src/store/settings/settings.slice';
import { logout } from '@/src/store/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '@/src/hooks/hooks';

export default function DropDownMenu({
  anchorEl,
  onClose,
}: {
  anchorEl: HTMLElement;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isActive: boolean = useAppSelector((state) => state.settings.darkMode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;

      // ✅ click inside menu → ignore
      if (ref.current?.contains(target)) return;

      // ✅ click on anchor (cog) → ignore
      if (anchorEl?.contains(target)) return;

      onClose();
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose, anchorEl]);

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
        top: anchorEl.getBoundingClientRect().bottom + 10,
        left: anchorEl.getBoundingClientRect().right - 250,
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
