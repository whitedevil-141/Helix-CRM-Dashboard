import { Icon } from '@/components/Icon/Icon';
import { Popover } from './Popover';

const WORKSPACES = [
  { id: 'helix-acme', name: 'Helix CRM', org: 'Acme · Scale plan', initial: 'H', active: true },
  { id: 'pearl', name: 'Pearl Maritime', org: 'Customer workspace', initial: 'P', active: false },
  { id: 'glasswing', name: 'Glasswing Studio', org: 'Customer workspace', initial: 'G', active: false },
];

interface WorkspaceSwitcherProps {
  open: boolean;
  onClose: () => void;
  push: (msg: string) => void;
}

export function WorkspaceSwitcher({ open, onClose, push }: WorkspaceSwitcherProps) {
  return (
    <Popover open={open} onClose={onClose} anchor="left" width={264}>
      <div className="popover-head">
        <div>
          <div className="popover-title">Workspaces</div>
          <div className="popover-sub">Switch between organizations</div>
        </div>
      </div>
      <div className="popover-menu" style={{ padding: 6 }}>
        {WORKSPACES.map(w => (
          <button key={w.id} className="popover-item" onClick={() => { push(`Switched to ${w.name}`); onClose(); }} style={{ padding: '8px 10px' }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: w.active ? 'var(--text)' : 'var(--card-hover)', color: w.active ? 'var(--bg)' : 'var(--text)', display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 600, border: '1px solid var(--border)' }}>{w.initial}</div>
            <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{w.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{w.org}</div>
            </div>
            {w.active && <Icon name="check" size={14} style={{ color: 'var(--text-dim)' }}/>}
          </button>
        ))}
      </div>
      <div className="popover-divider"/>
      <div className="popover-menu">
        <button className="popover-item"><Icon name="plus" size={15}/>Create workspace</button>
        <button className="popover-item"><Icon name="users" size={15}/>Join workspace</button>
      </div>
    </Popover>
  );
}
