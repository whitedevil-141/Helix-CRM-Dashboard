import { useState } from 'react';
import { Icon } from '@/components/Icon/Icon';
import { Popover } from './Popover';

interface Notification {
  id: string;
  kind: 'success' | 'warn' | 'info' | 'mention';
  text: string;
  time: string;
  unread: boolean;
}

const NOTIFICATIONS: Notification[] = [
  { id: 'n1', kind: 'success', text: '<b>Aether Bank</b> contract was signed', time: '12m ago', unread: true },
  { id: 'n2', kind: 'mention', text: '<b>Amelia</b> mentioned you in <i>Vertex Health renewal</i>', time: '1h ago', unread: true },
  { id: 'n3', kind: 'warn', text: '<b>3 high-value</b> accounts inactive 14+ days', time: '2h ago', unread: true },
  { id: 'n4', kind: 'info', text: '<b>Helix AI</b> generated your weekly digest', time: '3h ago', unread: false },
  { id: 'n5', kind: 'success', text: 'Deal moved: <b>Wavelet AI</b> → Negotiation', time: 'yest.', unread: false },
  { id: 'n6', kind: 'info', text: '<b>Lila Tran</b> accepted the workspace invite', time: 'yest.', unread: false },
];

interface NotificationsPopoverProps {
  open: boolean;
  onClose: () => void;
}

export function NotificationsPopover({ open, onClose }: NotificationsPopoverProps) {
  const [tab, setTab] = useState<'all' | 'unread'>('all');
  const [items, setItems] = useState(NOTIFICATIONS);
  const filtered = tab === 'unread' ? items.filter(n => n.unread) : items;
  const markAll = () => setItems(arr => arr.map(n => ({ ...n, unread: false })));

  return (
    <Popover open={open} onClose={onClose} width={380}>
      <div className="popover-head">
        <div>
          <div className="popover-title">Notifications</div>
          <div className="popover-sub">{items.filter(n => n.unread).length} unread</div>
        </div>
        <button className="chip" onClick={markAll}>Mark all read</button>
      </div>
      <div className="popover-tabs">
        <button className={tab === 'all' ? 'on' : ''} onClick={() => setTab('all')}>All</button>
        <button className={tab === 'unread' ? 'on' : ''} onClick={() => setTab('unread')}>Unread</button>
      </div>
      <div className="popover-list">
        {filtered.map(n => (
          <div key={n.id} className={'notif' + (n.unread ? ' unread' : '')} onClick={() => setItems(arr => arr.map(x => x.id === n.id ? { ...x, unread: false } : x))}>
            <div className={'notif-ic ' + n.kind}>
              <Icon name={n.kind === 'success' ? 'check' : n.kind === 'warn' ? 'flame' : n.kind === 'mention' ? 'user' : 'mail'} size={11}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="notif-text" dangerouslySetInnerHTML={{ __html: n.text }}/>
              <div className="notif-time">{n.time}</div>
            </div>
            {n.unread && <span className="notif-dot"/>}
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: 30, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>You're all caught up.</div>
        )}
      </div>
      <div className="popover-foot">
        <button className="popover-link">Notification settings</button>
        <button className="popover-link">See all activity →</button>
      </div>
    </Popover>
  );
}
