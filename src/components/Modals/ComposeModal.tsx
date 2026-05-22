import { useState, useEffect } from 'react';
import { Icon } from '@/components/Icon/Icon';
import { Modal } from './Modal';

interface ComposeData {
  to: string;
  subject: string;
  body: string;
}

interface ComposeModalProps {
  open: boolean;
  onClose: () => void;
  onSend?: (data: ComposeData) => void;
}

const DEFAULT: ComposeData = { to: '', subject: '', body: '' };

export function ComposeModal({ open, onClose, onSend }: ComposeModalProps) {
  const [data, setData] = useState<ComposeData>(DEFAULT);

  useEffect(() => { if (open) setData(DEFAULT); }, [open]);

  const set = (patch: Partial<ComposeData>) => setData(d => ({ ...d, ...patch }));
  const canSend = !!data.to && !!data.subject;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Compose message"
      size="lg"
      footer={<>
        <div style={{ flex: 1, display: 'flex', gap: 6 }}>
          <button className="icon-btn" title="Attach"><Icon name="paperclip" size={15}/></button>
          <button className="icon-btn" title="Insert image"><Icon name="image" size={15}/></button>
          <button className="icon-btn" title="AI assist"><Icon name="sparkles" size={15}/></button>
        </div>
        <button className="btn" onClick={onClose}>Save draft</button>
        <button className="btn btn-primary" onClick={() => { onSend?.(data); onClose(); }} disabled={!canSend}>Send</button>
      </>}
    >
      <div className="modal-grid" style={{ gridTemplateColumns: '1fr' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>
          <Icon name="user" size={14} style={{ color: 'var(--text-muted)' }}/>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', width: 40 }}>To</span>
          <input
            className="search"
            style={{ flex: 1, border: 'none', padding: '6px 0', background: 'transparent' }}
            placeholder="recipient@example.com"
            value={data.to}
            onChange={(e) => set({ to: e.target.value })}
            autoFocus
          />
          <button className="chip" style={{ padding: '2px 8px', fontSize: 11 }}>Cc</button>
          <button className="chip" style={{ padding: '2px 8px', fontSize: 11 }}>Bcc</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>
          <Icon name="tag" size={14} style={{ color: 'var(--text-muted)' }}/>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', width: 40 }}>Subject</span>
          <input
            className="search"
            style={{ flex: 1, border: 'none', padding: '6px 0', background: 'transparent' }}
            placeholder="Subject line"
            value={data.subject}
            onChange={(e) => set({ subject: e.target.value })}
          />
        </div>
        <textarea
          className="search"
          placeholder="Write your message…"
          style={{ minHeight: 260, border: 'none', padding: '8px 0', background: 'transparent', resize: 'vertical' }}
          value={data.body}
          onChange={(e) => set({ body: e.target.value })}
        />
      </div>
    </Modal>
  );
}
