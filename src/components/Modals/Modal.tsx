import { useEffect, ReactNode } from 'react';
import { Icon } from '@/components/Icon/Icon';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
}

const WIDTHS: Record<ModalSize, number> = { sm: 420, md: 540, lg: 720, xl: 920 };

export function Modal({ open, onClose, title, subtitle, children, footer, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="modal-backdrop open" onClick={onClose}>
      <div className="modal-shell" style={{ width: WIDTHS[size] }} onClick={(e) => e.stopPropagation()}>
        {(title || subtitle) && (
          <div className="modal-head">
            <div style={{ flex: 1, minWidth: 0 }}>
              {title && <div className="modal-title">{title}</div>}
              {subtitle && <div className="modal-sub">{subtitle}</div>}
            </div>
            <button className="icon-btn" onClick={onClose} aria-label="Close"><Icon name="close" size={15}/></button>
          </div>
        )}
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}
