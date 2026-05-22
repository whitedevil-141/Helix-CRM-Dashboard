/* global React, Icon */

const NAV_MAIN = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', kbd: 'D' },
  { id: 'pipeline',  label: 'Pipeline',  icon: 'pipeline',  kbd: 'P', badge: '12' },
  { id: 'contacts',  label: 'Contacts',  icon: 'contacts',  kbd: 'C' },
  { id: 'deals',     label: 'Deals',     icon: 'deals',     kbd: 'L' },
  { id: 'inbox',     label: 'Inbox',     icon: 'inbox',     kbd: 'I', count: 8 },
];
const NAV_WORK = [
  { id: 'reports',     label: 'Reports',      icon: 'reports' },
  { id: 'automations', label: 'Automations',  icon: 'automations' },
  { id: 'calendar',    label: 'Calendar',     icon: 'calendar' },
  { id: 'chat',        label: 'Team chat',    icon: 'chat', count: 3 },
];
const NAV_RESOURCES = [
  { id: 'components',  label: 'Components',   icon: 'panel' },
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

function Sidebar({ active, onChange, collapsed, onToggle, onCreate, wsOpen, onToggleWs, push, mobileOpen }) {
  const [createOpen, setCreateOpen] = React.useState(false);
  return (
    <aside className={"sidebar" + (collapsed ? " collapsed" : "") + (mobileOpen ? " mobile-open" : "")}>
      <button className="sb-collapse" onClick={onToggle} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
        <Icon name={collapsed ? "chevronRight" : "chevron"} size={11} style={{ transform: collapsed ? "none" : "rotate(90deg)" }}/>
      </button>

      {/* Workspace */}
      <div style={{ position: 'relative' }}>
        <button className="ws-switcher" data-tip="Helix CRM workspace" onClick={onToggleWs}>
          <div className="ws-logo">H</div>
          <div className="ws-meta">
            <span className="ws-name">Helix CRM</span>
            <span className="ws-tier">Acme · Scale plan</span>
          </div>
          <Icon name="chevron" size={14} className="ws-chevron"/>
        </button>
        <window.WorkspaceSwitcher open={wsOpen} onClose={onToggleWs} push={push}/>
      </div>

      {/* Quick actions */}
      <div className="sb-quick">
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button className="sb-quick-create" onClick={() => setCreateOpen(o => !o)} data-tip="Create new">
            <Icon name="plus" size={14}/>
            <span className="sb-label">Create</span>
            <span className="sb-kbd">C</span>
          </button>
          <window.Popover open={createOpen} onClose={() => setCreateOpen(false)} anchor="left" width={220} style={{ top: 'calc(100% + 6px)' }}>
            <div className="popover-menu">
              <button className="popover-item" onClick={() => { window.dispatchEvent(new CustomEvent('helix:new-deal')); setCreateOpen(false); }}>
                <Icon name="deals" size={15}/>New deal<span className="popover-kbd">D</span>
              </button>
              <button className="popover-item" onClick={() => { window.dispatchEvent(new CustomEvent('helix:new-contact')); setCreateOpen(false); }}>
                <Icon name="user" size={15}/>New contact<span className="popover-kbd">N</span>
              </button>
              <button className="popover-item" onClick={() => { window.dispatchEvent(new CustomEvent('helix:new-event')); setCreateOpen(false); }}>
                <Icon name="calendar" size={15}/>New event<span className="popover-kbd">E</span>
              </button>
              <button className="popover-item" onClick={() => { window.dispatchEvent(new CustomEvent('helix:new-automation')); setCreateOpen(false); }}>
                <Icon name="automations" size={15}/>New automation
              </button>
              <button className="popover-item" onClick={() => { window.dispatchEvent(new CustomEvent('helix:compose')); setCreateOpen(false); }}>
                <Icon name="mail" size={15}/>Compose message
              </button>
            </div>
          </window.Popover>
        </div>
        <button className="sb-search" onClick={() => window.dispatchEvent(new CustomEvent('helix:openpalette'))} data-tip="Search">
          <Icon name="search" size={14}/>
          <span className="sb-label">Search…</span>
          <span className="sb-kbd">⌘K</span>
        </button>
      </div>

      {/* Main nav */}
      <nav className="sb-section">
        {NAV_MAIN.map(item => (
          <SbItem key={item.id} item={item} active={active === item.id} onClick={() => onChange(item.id)}/>
        ))}
      </nav>

      {/* Pinned */}
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

      {/* Workspace */}
      <div className="sb-section">
        <div className="sb-section-title"><span>Workspace</span></div>
        {NAV_WORK.map(item => (
          <SbItem key={item.id} item={item} active={active === item.id} onClick={() => onChange(item.id)}/>
        ))}
      </div>

      {/* Teams / channels */}
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

      {/* Resources */}
      <div className="sb-section">
        <div className="sb-section-title"><span>Resources</span></div>
        {NAV_RESOURCES.map(item => (
          <SbItem key={item.id} item={item} active={active === item.id} onClick={() => onChange(item.id)}/>
        ))}
      </div>

      {/* Bottom */}
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

function SbItem({ item, active, onClick }) {
  return (
    <button
      className={"sb-item" + (active ? " active" : "")}
      onClick={onClick}
      data-tip={item.label}
    >
      <Icon name={item.icon} className="sb-ic"/>
      <span className="sb-label">{item.label}</span>
      {item.count != null && <span className="sb-badge">{item.count}</span>}
      {item.badge && <span className="sb-badge">{item.badge}</span>}
    </button>
  );
}

window.Sidebar = Sidebar;
