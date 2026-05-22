import { useState } from 'react';
import { Icon } from '@/components/Icon/Icon';
import { Popover, WorkspaceSwitcher } from '@/components/Popovers';
import {
  dispatchNewDeal, dispatchNewContact, dispatchNewEvent,
  dispatchNewAutomation, dispatchCompose, dispatchOpenPalette,
} from '@/utils/eventBus';
import type { Page, IconName } from '@/types';

interface NavItem {
  id: Page;
  label: string;
  icon: IconName;
  kbd?: string;
  badge?: string;
  count?: number;
}

const NAV_MAIN: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', kbd: 'D' },
  { id: 'pipeline',  label: 'Pipeline',  icon: 'pipeline',  kbd: 'P', badge: '12' },
  { id: 'contacts',  label: 'Contacts',  icon: 'contacts',  kbd: 'C' },
  { id: 'deals',     label: 'Deals',     icon: 'deals',     kbd: 'L' },
  { id: 'inbox',     label: 'Inbox',     icon: 'inbox',     kbd: 'I', count: 8 },
];
const NAV_WORK: NavItem[] = [
  { id: 'reports',     label: 'Reports',     icon: 'reports' },
  { id: 'automations', label: 'Automations', icon: 'automations' },
  { id: 'calendar',    label: 'Calendar',    icon: 'calendar' },
  { id: 'chat',        label: 'Team chat',   icon: 'chat', count: 3 },
];
const NAV_RESOURCES: NavItem[] = [
  { id: 'components', label: 'Components', icon: 'panel' },
];

const PINNED = [
  { id: 'pin-1', label: 'Aether Bank', kind: 'deal', initials: 'AB' },
  { id: 'pin-2', label: 'Vertex Health', kind: 'deal', initials: 'VH' },
  { id: 'pin-3', label: 'Priya Raman', kind: 'contact', initials: 'PR' },
];

const TEAMS = [
  { id: 'team-1', label: 'Sales · EMEA', color: '#6366F1' },
  { id: 'team-2', label: 'Customer Success', color: '#10B981' },
  { id: 'team-3', label: 'Revenue Ops', color: '#D97706' },
];

interface SidebarProps {
  active: Page;
  onChange: (page: Page) => void;
  collapsed: boolean;
  onToggle: () => void;
  onCreate?: () => void;
  wsOpen: boolean;
  onToggleWs: () => void;
  userOpen: boolean;
  onToggleUser: () => void;
  push: (msg: string) => void;
  mobileOpen: boolean;
}

export function Sidebar({ active, onChange, collapsed, onToggle, wsOpen, onToggleWs, push, mobileOpen }: SidebarProps) {
  const [createOpen, setCreateOpen] = useState(false);
  return (
    <aside className={'sidebar' + (collapsed ? ' collapsed' : '') + (mobileOpen ? ' mobile-open' : '')}>
      <button className="sb-collapse" onClick={onToggle} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
        <Icon name={collapsed ? 'chevronRight' : 'chevron'} size={11} style={{ transform: collapsed ? 'none' : 'rotate(90deg)' }}/>
      </button>

      <div style={{ position: 'relative' }}>
        <button className="ws-switcher" data-tip="Helix CRM workspace" onClick={onToggleWs}>
          <div className="ws-logo">H</div>
          <div className="ws-meta">
            <span className="ws-name">Helix CRM</span>
            <span className="ws-tier">Acme · Scale plan</span>
          </div>
          <Icon name="chevron" size={14} className="ws-chevron"/>
        </button>
        <WorkspaceSwitcher open={wsOpen} onClose={onToggleWs} push={push}/>
      </div>

      <div className="sb-quick">
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button className="sb-quick-create" onClick={() => setCreateOpen(o => !o)} data-tip="Create new">
            <Icon name="plus" size={14}/>
            <span className="sb-label">Create</span>
            <span className="sb-kbd">C</span>
          </button>
          <Popover open={createOpen} onClose={() => setCreateOpen(false)} anchor="left" width={220} style={{ top: 'calc(100% + 6px)' }}>
            <div className="popover-menu">
              <button className="popover-item" onClick={() => { dispatchNewDeal(); setCreateOpen(false); }}>
                <Icon name="deals" size={15}/>New deal<span className="popover-kbd">D</span>
              </button>
              <button className="popover-item" onClick={() => { dispatchNewContact(); setCreateOpen(false); }}>
                <Icon name="user" size={15}/>New contact<span className="popover-kbd">N</span>
              </button>
              <button className="popover-item" onClick={() => { dispatchNewEvent(); setCreateOpen(false); }}>
                <Icon name="calendar" size={15}/>New event<span className="popover-kbd">E</span>
              </button>
              <button className="popover-item" onClick={() => { dispatchNewAutomation(); setCreateOpen(false); }}>
                <Icon name="automations" size={15}/>New automation
              </button>
              <button className="popover-item" onClick={() => { dispatchCompose(); setCreateOpen(false); }}>
                <Icon name="mail" size={15}/>Compose message
              </button>
            </div>
          </Popover>
        </div>
        <button className="sb-search" onClick={dispatchOpenPalette} data-tip="Search">
          <Icon name="search" size={14}/>
          <span className="sb-label">Search…</span>
          <span className="sb-kbd">⌘K</span>
        </button>
      </div>

      <nav className="sb-section">
        {NAV_MAIN.map(item => (
          <SbItem key={item.id} item={item} active={active === item.id} onClick={() => onChange(item.id)}/>
        ))}
      </nav>

      <div className="sb-section">
        <div className="sb-section-title">
          <span>Pinned</span>
          <button className="sb-section-act" aria-label="Manage pinned"><Icon name="more" size={12}/></button>
        </div>
        {PINNED.map(p => (
          <button key={p.id} className="sb-item sb-item-pinned" data-tip={p.label}>
            <span className="sb-pin-ic">{p.initials}</span>
            <span className="sb-label">{p.label}</span>
            <span className="sb-pin-kind">{p.kind}</span>
          </button>
        ))}
      </div>

      <div className="sb-section">
        <div className="sb-section-title"><span>Workspace</span></div>
        {NAV_WORK.map(item => (
          <SbItem key={item.id} item={item} active={active === item.id} onClick={() => onChange(item.id)}/>
        ))}
      </div>

      <div className="sb-section">
        <div className="sb-section-title">
          <span>Teams</span>
          <button className="sb-section-act" aria-label="New team"><Icon name="plus" size={12}/></button>
        </div>
        {TEAMS.map(t => (
          <button key={t.id} className="sb-item" data-tip={t.label}>
            <span className="sb-team-dot" style={{ background: t.color }}/>
            <span className="sb-label">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="sb-section">
        <div className="sb-section-title"><span>Resources</span></div>
        {NAV_RESOURCES.map(item => (
          <SbItem key={item.id} item={item} active={active === item.id} onClick={() => onChange(item.id)}/>
        ))}
      </div>

      <div className="sb-bottom">
        <SbItem
          item={{ id: 'settings', label: 'Settings', icon: 'settings' }}
          active={active === 'settings'}
          onClick={() => onChange('settings')}
        />
        <div className="user-card" data-tip="Mira Okafor">
          <div className="avatar online" style={{ background: '#475569', color: '#fff', borderColor: 'transparent' }}>MO</div>
          <div className="user-meta">
            <span className="user-name">Mira Okafor</span>
            <span className="user-role">Head of Sales</span>
          </div>
          <Icon name="chevron" size={12} style={{ color: 'var(--text-muted)' }} className="user-chev"/>
        </div>
      </div>
    </aside>
  );
}

function SbItem({ item, active, onClick }: { item: NavItem; active: boolean; onClick: () => void }) {
  return (
    <button className={'sb-item' + (active ? ' active' : '')} onClick={onClick} data-tip={item.label}>
      <Icon name={item.icon} className="sb-ic"/>
      <span className="sb-label">{item.label}</span>
      {item.count != null && <span className="sb-badge">{item.count}</span>}
      {item.badge && <span className="sb-badge">{item.badge}</span>}
    </button>
  );
}
