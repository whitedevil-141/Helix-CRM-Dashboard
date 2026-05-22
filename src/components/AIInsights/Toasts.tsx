import { Icon } from '@/components/Icon/Icon';
import type { Toast } from '@/types';

interface ToastsProps {
  toasts: Toast[];
}

export function Toasts({ toasts }: ToastsProps) {
  return (
    <div className="toasts">
      {toasts.map(t => (
        <div key={t.id} className="toast">
          <div className="t-ic"><Icon name="check" size={14} style={{ color: '#fff' }}/></div>
          <span>{t.text}</span>
        </div>
      ))}
    </div>
  );
}
