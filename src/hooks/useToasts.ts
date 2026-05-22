import { useState } from 'react';
import type { Toast } from '@/types';

export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = (text: string) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts(t => [...t, { id, text }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
  };

  return { toasts, push };
}
