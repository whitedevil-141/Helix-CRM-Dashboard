import { Modal } from './Modal';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  message?: string;
  confirmLabel?: string;
  destructive?: boolean;
}

export function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmLabel = 'Confirm', destructive = false }: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      title={title}
      footer={<>
        <button className="btn" onClick={onClose}>Cancel</button>
        <button
          className={'btn ' + (destructive ? 'btn-destructive' : 'btn-primary')}
          onClick={() => { onConfirm?.(); onClose(); }}
        >{confirmLabel}</button>
      </>}
    >
      <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-dim)', lineHeight: 1.55 }}>{message}</p>
    </Modal>
  );
}
