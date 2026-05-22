import { useEffect, useRef } from 'react';

interface PopoverProps {
  open: boolean;
  onClose: () => void;
  anchor?: 'left' | 'right';
  children: React.ReactNode;
  width?: number;
  style?: React.CSSProperties;
}

export function Popover({ open, onClose, anchor = 'right', children, width = 320, style }: PopoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    setTimeout(() => document.addEventListener('mousedown', onDoc), 0);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div ref={ref} className="popover" style={{ [anchor === 'right' ? 'right' : 'left']: 0, width, ...style }}>
      {children}
    </div>
  );
}
