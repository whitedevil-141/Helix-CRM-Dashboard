/* global React, Icon */
const { useState: useP, useEffect: usePE, useRef: usePR } = React;

/* =========================================================
   POPOVER PRIMITIVE — auto-close on outside click
   ========================================================= */
function Popover({ open, onClose, anchor = 'right', children, width = 320, style }) {
  const ref = usePR(null);
  usePE(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    setTimeout(() => document.addEventListener('mousedown', onDoc), 0);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div ref={ref} className="popover" style={{ [anchor === 'right' ? 'right' : 'left']: 0, width, ...style }}>
      {children}
    </div>
  );
}

/* =========================================================
   NOTIFICATIONS DROPDOWN
   ========================================================= */
const NOTIFICATIONS = [
  { id: 'n1', kind: 'success', text: '<b>Aether Bank</b> contract was signed', time: '12m ago', unread: true },
  { id: 'n2', kind: 'mention', text: '<b>Amelia</b> mentioned you in <i>Vertex Health renewal</i>', time: '1h ago', unread: true },
  { id: 'n3', kind: 'warn', text: '<b>3 high-value</b> accounts inactive 14+ days', time: '2h ago', unread: true },
  { id: 'n4', kind: 'info', text: '<b>Helix AI</b> generated your weekly digest', time: '3h ago', unread: false },
  { id: 'n5', kind: 'success', text: 'Deal moved: <b>Wavelet AI</b> → Negotiation', time: 'yest.', unread: false },
  { id: 'n6', kind: 'info', text: '<b>Lila Tran</b> accepted the workspace invite', time: 'yest.', unread: false },
];

function NotificationsPopover({ open, onClose }) {
  const [tab, setTab] = useP('all');
  const [items, setItems] = useP(NOTIFICATIONS);
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
          <div key={n.id} className={"notif" + (n.unread ? ' unread' : '')} onClick={() => setItems(arr => arr.map(x => x.id === n.id ? { ...x, unread: false } : x))}>
            <div className={"notif-ic " + n.kind}>
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

/* =========================================================
   USER MENU DROPDOWN
   ========================================================= */
function UserMenuPopover({ open, onClose, onNavigate, onTheme, theme, push }) {
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
        <button className="popover-item" onClick={() => { window.dispatchEvent(new CustomEvent('helix:openpalette')); onClose(); }}>
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
        <button className="popover-item destructive" onClick={() => { push?.('Signed out'); onClose(); }}>
          <Icon name="lock" size={15}/>Sign out
        </button>
      </div>
    </Popover>
  );
}

/* =========================================================
   WORKSPACE SWITCHER POPOVER
   ========================================================= */
const WORKSPACES = [
  { id: 'helix-acme', name: 'Helix CRM', org: 'Acme · Scale plan', initial: 'H', active: true },
  { id: 'pearl', name: 'Pearl Maritime', org: 'Customer workspace', initial: 'P' },
  { id: 'glasswing', name: 'Glasswing Studio', org: 'Customer workspace', initial: 'G' },
];

function WorkspaceSwitcher({ open, onClose, push }) {
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
          <button key={w.id} className="popover-item" onClick={() => { push?.(`Switched to ${w.name}`); onClose(); }} style={{ padding: '8px 10px' }}>
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

/* =========================================================
   AI ASSISTANT SLIDE-OUT PANEL
   ========================================================= */
const SUGGESTED_PROMPTS = [
  'Summarize this week',
  'Which deals are at risk?',
  'Draft a follow-up to Vertex Health',
  'Generate weekly digest email',
];

function AIAssistantPanel({ open, onClose, push }) {
  const [messages, setMessages] = useP([
    { role: 'ai', text: "Hi Mira — I'm Helix. I've reviewed your pipeline and have a few observations ready when you are." },
  ]);
  const [input, setInput] = useP('');
  const [thinking, setThinking] = useP(false);
  const streamRef = usePR(null);

  usePE(() => {
    if (streamRef.current) streamRef.current.scrollTop = streamRef.current.scrollHeight;
  }, [messages, thinking]);

  const send = (text) => {
    const q = (text ?? input).trim();
    if (!q) return;
    setInput('');
    setMessages(arr => [...arr, { role: 'user', text: q }]);
    setThinking(true);
    setTimeout(() => {
      const reply = generateMockReply(q);
      setThinking(false);
      setMessages(arr => [...arr, { role: 'ai', text: reply.text, citations: reply.citations }]);
    }, 1100 + Math.random() * 600);
  };

  return (
    <>
      <div className={"drawer-backdrop" + (open ? " open" : "")} onClick={onClose}></div>
      <aside className={"ai-panel" + (open ? " open" : "")} role="dialog" aria-label="AI assistant">
        <div className="ai-panel-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="ai-orb"><Icon name="sparkles" size={14} style={{ color: 'var(--bg)' }}/></div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Ask Helix</div>
              <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>AI assistant · analyzing 2,418 contacts</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button className="icon-btn" title="New chat"><Icon name="plus" size={15}/></button>
            <button className="icon-btn" title="History"><Icon name="refresh" size={15}/></button>
            <button className="icon-btn" onClick={onClose} aria-label="Close"><Icon name="close" size={15}/></button>
          </div>
        </div>

        <div className="ai-panel-stream" ref={streamRef}>
          {messages.map((m, i) => (
            <div key={i} className={"ai-msg " + m.role}>
              {m.role === 'ai' && <div className="ai-orb" style={{ width: 22, height: 22, borderRadius: 5, flexShrink: 0 }}><Icon name="sparkles" size={11} style={{ color: 'var(--bg)' }}/></div>}
              <div className="ai-msg-body">
                <div className="ai-msg-text" dangerouslySetInnerHTML={{ __html: m.text }}/>
                {m.citations && (
                  <div className="ai-citations">
                    {m.citations.map((c, j) => (
                      <button key={j} className="ai-citation">{c}</button>
                    ))}
                  </div>
                )}
                {m.role === 'ai' && (
                  <div className="ai-msg-actions">
                    <button className="icon-btn" style={{ width: 22, height: 22 }} title="Copy"><Icon name="copy" size={11}/></button>
                    <button className="icon-btn" style={{ width: 22, height: 22 }} title="Regenerate"><Icon name="refresh" size={11}/></button>
                    <button className="icon-btn" style={{ width: 22, height: 22 }} title="Good response">👍</button>
                    <button className="icon-btn" style={{ width: 22, height: 22 }} title="Bad response">👎</button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {thinking && (
            <div className="ai-msg ai">
              <div className="ai-orb" style={{ width: 22, height: 22, borderRadius: 5, flexShrink: 0 }}><Icon name="sparkles" size={11} style={{ color: 'var(--bg)' }}/></div>
              <div className="ai-msg-body">
                <div className="ai-typing"><span></span><span></span><span></span></div>
              </div>
            </div>
          )}
        </div>

        {messages.length <= 2 && (
          <div className="ai-suggestions">
            <div className="ai-suggestions-h">Suggested</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {SUGGESTED_PROMPTS.map(p => (
                <button key={p} className="ai-pill" onClick={() => send(p)}>{p}</button>
              ))}
            </div>
          </div>
        )}

        <div className="ai-panel-input">
          <textarea
            className="search"
            placeholder="Ask anything about your pipeline, deals, or customers…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            rows={1}
            style={{ paddingRight: 38, resize: 'none', minHeight: 38, maxHeight: 140 }}
          />
          <button className="ai-send" onClick={() => send()} disabled={!input.trim()} aria-label="Send">
            <Icon name="send" size={13}/>
          </button>
        </div>
        <div className="ai-panel-foot">
          <span>Helix can make mistakes. Verify critical decisions.</span>
          <span style={{ fontFamily: 'var(--mono)', color: 'var(--text-muted)' }}>⏎ to send</span>
        </div>
      </aside>
    </>
  );
}

function generateMockReply(q) {
  const ql = q.toLowerCase();
  if (ql.includes('risk') || ql.includes('churn')) {
    return {
      text: "I see <b>3 accounts</b> with elevated churn signals this week:<br/><br/>• <b>Vertex Health</b> — usage down 38% MTD, last login 12 days ago<br/>• <b>Glasswing Studio</b> — trial ending in 3 days, no decision-maker meeting scheduled<br/>• <b>Lumen Mobility</b> — support ticket open 9 days, sentiment negative<br/><br/>Want me to draft outreach for any of these?",
      citations: ['Vertex Health usage report', 'Glasswing trial timeline', 'Lumen support log']
    };
  }
  if (ql.includes('week') || ql.includes('summary') || ql.includes('digest')) {
    return {
      text: "Here's your week at a glance:<br/><br/>• Pipeline up <b>12.4%</b> — $1.24M weighted<br/>• <b>2 deals closed</b> ($63.2k total) — Pearl Maritime, Orbit Studios<br/>• <b>3 deals stuck</b> in Negotiation more than 14 days<br/>• Top performer: <b>Amelia Rouse</b> with $412k closed-won<br/><br/>The biggest opportunity is converting the 3 stalled negotiations — they represent <b>$346k</b> in pipeline.",
      citations: ['Weekly pipeline report', 'Top performers']
    };
  }
  if (ql.includes('draft') || ql.includes('follow') || ql.includes('email')) {
    return {
      text: "Here's a draft you can edit:<br/><br/><i>Hi Priya,</i><br/><br/><i>Following up on our integration scoping call — I've shared your questions about webhook retry behavior with our engineering team. Quick summary of their answers:</i><br/><br/><i>1. Exponential backoff (1s, 2s, 4s, 8s, max 64s) over 24 hours<br/>2. Metadata filtering is supported via the events query parameter<br/>3. At 4× your current volume, you'd remain comfortably within the Enterprise tier</i><br/><br/><i>Happy to set up a 30-minute follow-up this week.</i>"
    };
  }
  return {
    text: "I can help with pipeline analysis, drafting outreach, summarizing reports, and surfacing risk signals. What would you like to do?",
  };
}

/* =========================================================
   HELP / SUPPORT WIDGET (floating bottom-left)
   ========================================================= */
function HelpWidget() {
  const [open, setOpen] = useP(false);
  return (
    <div className="help-widget">
      {open && (
        <div className="help-panel" onClick={(e) => e.stopPropagation()}>
          <div className="help-head">
            <div>
              <div className="popover-title">Help &amp; resources</div>
              <div className="popover-sub">We typically reply in under 4 hours.</div>
            </div>
            <button className="icon-btn" onClick={() => setOpen(false)}><Icon name="close" size={14}/></button>
          </div>
          <div className="popover-menu" style={{ padding: 6 }}>
            <button className="popover-item"><Icon name="search" size={15}/>Search docs</button>
            <button className="popover-item"><Icon name="chat" size={15}/>Start a chat<span className="popover-kbd" style={{ background: 'var(--accent-tint-strong)', color: 'var(--text)', border: '1px solid var(--border)' }}>online</span></button>
            <button className="popover-item"><Icon name="mail" size={15}/>Email support</button>
            <button className="popover-item"><Icon name="calendar" size={15}/>Book onboarding call</button>
          </div>
          <div className="popover-divider"/>
          <div style={{ padding: '10px 14px 14px' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, fontWeight: 500 }}>Quick links</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {['Getting started', 'API reference', 'Keyboard shortcuts', "What's new"].map(l => (
                <button key={l} className="help-link">{l} <Icon name="chevronRight" size={11}/></button>
              ))}
            </div>
          </div>
        </div>
      )}
      <button className="help-toggle" onClick={() => setOpen(o => !o)} aria-label="Help">
        {open ? <Icon name="close" size={16}/> : <span style={{ fontWeight: 600, fontSize: 15 }}>?</span>}
      </button>
    </div>
  );
}

window.Popover = Popover;
window.NotificationsPopover = NotificationsPopover;
window.UserMenuPopover = UserMenuPopover;
window.WorkspaceSwitcher = WorkspaceSwitcher;
window.AIAssistantPanel = AIAssistantPanel;
window.HelpWidget = HelpWidget;
