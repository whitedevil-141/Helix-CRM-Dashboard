import { Icon } from '@/components/Icon/Icon';
import { Popover } from './Popover';
import { dispatchOpenPalette } from '@/utils/eventBus';
import type { Page } from '@/types';

interface UserMenuPopoverProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (page: Page) => void;
  onTheme: () => void;
  theme: string;
  push: (msg: string) => void;
}

export function UserMenuPopover({ open, onClose, onNavigate, onTheme, theme, push }: UserMenuPopoverProps) {
  return (
    <Popover open={open} onClose={onClose} width={260}>
      <div className="popover-user">
        <div className="avatar" style={{ width: 40, height: 40, fontSize: 13, background: '#475569', color: '#fff', borderColor: 'transparent' }}>MO</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600 }}>Mira Okafor</div>
          <div style={{ fontSize: 11.5, color: 'var(--text-dim)' }}>mira@helix.app</div>
        </div>
      </div>
      <div className="popover-divider"/>
      <div className="popover-menu">
        <button className="popover-item" onClick={() => { onNavigate('settings'); onClose(); }}>
          <Icon name="user" size={15}/>Profile settings
          <span className="popover-kbd">⌘ ,</span>
        </button>
        <button className="popover-item" onClick={() => { onTheme(); }}>
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={15}/>{theme === 'dark' ? 'Light mode' : 'Dark mode'}
          <span className="popover-kbd">⌘ T</span>
        </button>
        <button className="popover-item">
          <Icon name="bell" size={15}/>Notification settings
        </button>
        <button className="popover-item" onClick={() => { dispatchOpenPalette(); onClose(); }}>
          <Icon name="search" size={15}/>Command palette
          <span className="popover-kbd">⌘ K</span>
        </button>
      </div>
      <div className="popover-divider"/>
      <div className="popover-menu">
        <button className="popover-item">
          <Icon name="users" size={15}/>Invite team
        </button>
        <button className="popover-item">
          <Icon name="chat" size={15}/>Contact support
        </button>
        <button className="popover-item">
          <Icon name="panel" size={15}/>Helix changelog
        </button>
      </div>
      <div className="popover-divider"/>
      <div className="popover-menu">
        <button className="popover-item destructive" onClick={() => { push('Signed out'); onClose(); }}>
          <Icon name="lock" size={15}/>Sign out
        </button>
      </div>
    </Popover>
  );
}
