/* global React, Icon */
const { useState, useEffect, useRef } = React;

// ---------- AI Insights Card ----------
function AIInsights() {
  const insights = [
    { headline: "Pipeline is up 12.4% week-over-week, driven by Enterprise deals.", action: "View deals", hl: "12.4%" },
    { headline: "3 high-value accounts haven't been contacted in 14+ days.", action: "Open list", hl: "3 high-value accounts" },
    { headline: "Vertex Health is showing churn signals: usage down 38% MTD.", action: "Create play", hl: "Vertex Health" },
    { headline: "Win-rate jumped to 31% on deals where pricing demo happens within 5 days.", action: "See pattern", hl: "31%" },
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % insights.length), 6000);
    return () => clearInterval(t);
  }, []);
  const cur = insights[idx];
  const parts = cur.headline.split(cur.hl);

  return (
    <div className="ai-card">
      <div className="ai-head">
        <div className="ai-orb">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7z" fill="#fff"/>
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div className="ai-title">Helix Intelligence</div>
          <div className="ai-status"><span className="live-dot"></span> Analyzing 2,418 signals</div>
        </div>
        <button className="icon-btn" style={{ width: 28, height: 28 }} aria-label="Refresh">
          <Icon name="return" size={14}/>
        </button>
      </div>

      <div className="ai-insight" key={idx}>
        <span style={{ animation: 'fade-up 0.5s ease both' }}>
          {parts[0]}<span className="hl">{cur.hl}</span>{parts[1]}
        </span>
      </div>

      <div className="ai-actions">
        <button className="ai-pill">{cur.action}</button>
        <button className="ai-pill">Why?</button>
        <button className="ai-pill">Snooze</button>
      </div>

      <div style={{
        display: 'flex', gap: 4, marginTop: 14, alignItems: 'center', justifyContent: 'center'
      }}>
        {insights.map((_, i) => (
          <div key={i} style={{
            width: i === idx ? 18 : 5, height: 5, borderRadius: 100,
            background: i === idx ? 'var(--accent)' : 'var(--border-strong)',
            transition: 'width 0.4s ease, background 0.4s ease'
          }}/>
        ))}
      </div>
    </div>
  );
}

// ---------- Activity feed ----------
function ActivityFeed({ items }) {
  return (
    <div className="feed">
      {items.map(a => (
        <div key={a.id} className="feed-item">
          <div className={"feed-ic " + a.kind}>
            <Icon name={a.kind === 'success' ? 'check' : a.kind === 'warn' ? 'flame' : 'mail'} size={11}/>
          </div>
          <div className="feed-body">
            <div className="feed-text" dangerouslySetInnerHTML={{ __html: a.text }}/>
            <div className="feed-time">{a.time}{a.meta ? ` · ${a.meta}` : ''}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------- Command Palette ----------
function CommandPalette({ open, onClose, onNavigate }) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef(null);

  const items = [
    { kind: 'Navigate', label: 'Go to Dashboard',   icon: 'dashboard',   kbd: 'G D', action: () => onNavigate('dashboard') },
    { kind: 'Navigate', label: 'Go to Pipeline',    icon: 'pipeline',    kbd: 'G P', action: () => onNavigate('pipeline') },
    { kind: 'Navigate', label: 'Go to Contacts',    icon: 'contacts',    kbd: 'G C', action: () => onNavigate('contacts') },
    { kind: 'Navigate', label: 'Go to Deals',       icon: 'deals',       kbd: 'G L', action: () => onNavigate('deals') },
    { kind: 'Navigate', label: 'Go to Inbox',       icon: 'inbox',       kbd: 'G I', action: () => onNavigate('inbox') },
    { kind: 'Navigate', label: 'Go to Reports',     icon: 'reports',     kbd: 'G R', action: () => onNavigate('reports') },
    { kind: 'Navigate', label: 'Go to Automations', icon: 'automations',           action: () => onNavigate('automations') },
    { kind: 'Navigate', label: 'Go to Calendar',    icon: 'calendar',              action: () => onNavigate('calendar') },
    { kind: 'Navigate', label: 'Go to Team chat',   icon: 'chat',                  action: () => onNavigate('chat') },
    { kind: 'Navigate', label: 'Go to Components',  icon: 'panel',                 action: () => onNavigate('components') },
    { kind: 'Navigate', label: 'Go to Settings',    icon: 'settings',              action: () => onNavigate('settings') },
    { kind: 'Create', label: 'New deal', icon: 'plus', kbd: 'N D', action: () => {} },
    { kind: 'Create', label: 'New contact', icon: 'plus', kbd: 'N C', action: () => {} },
    { kind: 'Create', label: 'New automation', icon: 'automations', kbd: 'N A', action: () => {} },
    { kind: 'AI', label: 'Ask Helix to summarize this week', icon: 'sparkles', kbd: '⏎', action: () => {} },
    { kind: 'AI', label: 'Generate weekly digest email', icon: 'sparkles', kbd: '', action: () => {} },
    { kind: 'Setting', label: 'Toggle theme', icon: 'moon', kbd: '⌘ T', action: () => {} },
    { kind: 'Setting', label: 'Switch workspace', icon: 'panel', kbd: '⌘ /', action: () => {} },
  ];
  const filtered = q ? items.filter(i => (i.label + i.kind).toLowerCase().includes(q.toLowerCase())) : items;
  const groups = filtered.reduce((acc, i) => { (acc[i.kind] = acc[i.kind] || []).push(i); return acc; }, {});

  useEffect(() => {
    if (open) {
      setQ('');
      setSel(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(filtered.length - 1, s + 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setSel(s => Math.max(0, s - 1)); }
      else if (e.key === 'Enter') { e.preventDefault(); filtered[sel]?.action?.(); onClose(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, sel, filtered, onClose]);

  let cursor = -1;
  return (
    <div className={"cmd-backdrop" + (open ? " open" : "")} onClick={onClose}>
      <div className="cmd" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-input-wrap">
          <Icon name="search" size={17} style={{ color: 'var(--text-muted)' }}/>
          <input ref={inputRef} className="cmd-input" placeholder="Type a command or search…" value={q} onChange={(e) => { setQ(e.target.value); setSel(0); }}/>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', border: '1px solid var(--border)', padding: '2px 6px', borderRadius: 5 }}>esc</span>
        </div>
        <div className="cmd-list">
          {Object.entries(groups).map(([group, list]) => (
            <div key={group}>
              <div className="cmd-section">{group}</div>
              {list.map((it) => {
                cursor++;
                const isSel = cursor === sel;
                return (
                  <div key={it.label} className={"cmd-item" + (isSel ? " sel" : "")} onClick={() => { it.action(); onClose(); }} onMouseEnter={(() => { const c = cursor; return () => setSel(c); })()}>
                    <Icon name={it.icon} size={15} style={{ color: 'var(--text-dim)' }}/>
                    <span>{it.label}</span>
                    {it.kbd && <span className="k">{it.kbd}</span>}
                  </div>
                );
              })}
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: '40px 12px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>No matches.</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------- Toasts ----------
function useToasts() {
  const [toasts, setToasts] = useState([]);
  const push = (text) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts(t => [...t, { id, text }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
  };
  return { toasts, push };
}
function Toasts({ toasts }) {
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

window.AIInsights = AIInsights;
window.ActivityFeed = ActivityFeed;
window.CommandPalette = CommandPalette;
window.Toasts = Toasts;
window.useToasts = useToasts;
