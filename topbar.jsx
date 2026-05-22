/* global React, Icon, NotificationsPopover, UserMenuPopover */

function Topbar({ page, onToggleAI, onToggleTheme, theme, onOpenPalette, notifOpen, onToggleNotif, onCloseNotif, userOpen, onToggleUser, onCloseUser, onNavigate, push, onToggleMobile }) {
  const pageMap = {
    dashboard: 'Dashboard',
    pipeline: 'Pipeline',
    contacts: 'Contacts',
    deals: 'Deals',
    inbox: 'Inbox',
    reports: 'Reports',
    automations: 'Automations',
    calendar: 'Calendar',
    chat: 'Team chat',
    components: 'Components',
    settings: 'Settings',
  };
  return (
    <header className="topbar">
      <button className="icon-btn tb-menu" onClick={onToggleMobile} aria-label="Open menu">
        <Icon name="menu" size={18}/>
      </button>
      <nav className="crumbs">
        <span>Workspace</span>
        <Icon name="chevronRight" size={12} className="sep"/>
        <span>Sales</span>
        <Icon name="chevronRight" size={12} className="sep"/>
        <span className="cur">{pageMap[page] || page}</span>
      </nav>
      <div className="tb-mobile-title">{pageMap[page] || page}</div>

      <div className="search-wrap">
        <Icon name="search" size={15} className="search-ic"/>
        <input
          className="search"
          placeholder="Search contacts, deals, files…"
          onFocus={(e) => { e.target.blur(); onOpenPalette(); }}
        />
        <span className="search-kbd">⌘K</span>
      </div>

      <button className="icon-btn tb-search-mobile" onClick={onOpenPalette} aria-label="Search">
        <Icon name="search" size={17}/>
      </button>

      <div className="tb-actions">
        <button className="btn-ai" onClick={onToggleAI}>
          <Icon name="sparkles" size={14} className="spark"/>
          <span className="btn-ai-label">Ask Helix</span>
        </button>

        <div style={{ position: 'relative' }}>
          <button className="icon-btn" aria-label="Notifications" title="Notifications" onClick={onToggleNotif}>
            <Icon name="bell" size={17}/>
            <span className="pulse"></span>
          </button>
          <NotificationsPopover open={notifOpen} onClose={onCloseNotif}/>
        </div>

        <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
          <Icon name="sun" size={17} className="tt-icon tt-sun"/>
          <Icon name="moon" size={17} className="tt-icon tt-moon"/>
        </button>

        <div style={{ position: 'relative' }}>
          <button className="user-pop" aria-label="Account" onClick={onToggleUser}>
            <div className="avatar online" style={{ width: 26, height: 26, fontSize: 10, background: '#475569', color: '#fff', borderColor: 'transparent' }}>MO</div>
            <Icon name="chevron" size={14} style={{ color: 'var(--text-muted)' }}/>
          </button>
          <UserMenuPopover open={userOpen} onClose={onCloseUser} onNavigate={onNavigate} onTheme={onToggleTheme} theme={theme} push={push}/>
        </div>
      </div>
    </header>
  );
}

window.Topbar = Topbar;
