import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'expo-router';

type Props = {
  anchorRect: DOMRect;
  onClose: () => void;
};

export default function UserMenu({ anchorRect, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // ✅ Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return createPortal(
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: anchorRect.bottom + 8,
        left: anchorRect.right - 220,
        width: 220,
        background: 'white',
        borderRadius: 8,
        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
        zIndex: 9999,
      }}
    >
      <MenuItem href='/settings'>Settings</MenuItem>
      <MenuItem href='/support'>Support</MenuItem>

      <div style={{ height: 1, background: '#e5e7eb', margin: '6px 0' }} />

      <MenuItem onClick={() => alert('Toggle dark mode')}>Dark mode</MenuItem>

      <MenuItem danger onClick={() => alert('Logout')}>
        Log out
      </MenuItem>
    </div>,
    document.body,
  );
}

function MenuItem({
  children,
  href,
  onClick,
  danger,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  danger?: boolean;
}) {
  const content = (
    <div
      onClick={onClick}
      style={{
        padding: '12px 16px',
        cursor: 'pointer',
        fontWeight: 500,
        color: danger ? '#dc2626' : '#111827',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = '#f3f4f6')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      {children}
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
