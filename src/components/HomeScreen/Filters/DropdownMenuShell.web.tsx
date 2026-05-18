import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const DropdownMenuShell = ({
  anchorEl,
  width,
  onClose,
  children,
}: {
  anchorEl: React.RefObject<HTMLDivElement | null>;
  width?: number;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;

      if (ref.current?.contains(target)) return;
      if (anchorEl.current?.contains(target)) return;

      onClose();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, anchorEl]);

  if (!anchorEl.current) return null;

  const rect = anchorEl.current.getBoundingClientRect();

  return createPortal(
    <div
      className='absolute z-50 rounded-lg bg-white shadow-md'
      style={{
        top: rect.bottom + 8,
        left: rect.left,
        width,
      }}
    >
      {children}
    </div>,
    document.body,
  );
};

export default DropdownMenuShell;
