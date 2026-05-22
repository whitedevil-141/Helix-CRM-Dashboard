/* global React, Icon, HELIX_DATA */
const { useState: useState2, useMemo: useMemo2 } = React;

/* =========================================================
   CALENDAR
   ========================================================= */
const EVENTS = {
  3: [{ t: '9:00', name: 'Pipeline review', color: '#6366F1' }],
  6: [{ t: '14:00', name: 'Atlas Freight renewal call', color: '#10B981' }],
  8: [{ t: '10:30', name: 'Vertex Health intro', color: '#D97706' }],
  12: [{ t: '11:00', name: 'Quarterly board prep', color: '#6366F1' }, { t: '15:30', name: 'Glasswing demo', color: '#10B981' }],
  14: [{ t: '9:30', name: 'Wavelet AI QBR', color: '#10B981' }],
  17: [{ t: '13:00', name: 'Pearl Maritime check-in', color: '#6366F1' }],
  18: [{ t: '10:00', name: 'Aether Bank signoff', color: '#E11D48' }, { t: '15:00', name: 'Team standup', color: '#475569' }],
  20: [{ t: '11:30', name: 'Lumen Mobility kickoff', color: '#10B981' }],
  22: [{ t: '9:00', name: 'Pipeline review', color: '#6366F1' }],
  25: [{ t: '14:00', name: 'Helios Robotics demo', color: '#D97706' }],
  27: [{ t: '10:00', name: 'Northwind expansion call', color: '#10B981' }],
};

function CalendarView() {
  const [month] = useState2('May 2026');
  const [today] = useState2(20);
  const [selected, setSelected] = useState2(20);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const firstOffset = 4; // Friday start = 4

  const todays = EVENTS[selected] || [];

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Calendar</h1>
          <div className="sub">{month} · 14 events · synced from Google Cal</div>
        </div>
        <div className="right">
          <div className="seg">
            <button>Day</button>
            <button>Week</button>
            <button className="on">Month</button>
            <button>Schedule</button>
          </div>
          <button className="btn"><Icon name="chevron" size={13} style={{ transform: 'rotate(90deg)' }}/></button>
          <button className="btn">{month}</button>
          <button className="btn"><Icon name="chevron" size={13} style={{ transform: 'rotate(-90deg)' }}/></button>
          <button className="btn btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('helix:new-event'))}><Icon name="plus" size={13}/> New event</button>
        </div>
      </div>

      <div className="row" style={{ gridTemplateColumns: '2.4fr 1fr' }}>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="cal-head">
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
              <div key={d} className="cal-head-cell">{d}</div>
            ))}
          </div>
          <div className="cal-grid">
            {Array.from({ length: firstOffset }, (_, i) => (
              <div key={'pad'+i} className="cal-cell empty"></div>
            ))}
            {days.map(d => {
              const evs = EVENTS[d] || [];
              return (
                <button
                  key={d}
                  className={"cal-cell" + (d === today ? ' today' : '') + (d === selected ? ' selected' : '')}
                  onClick={() => setSelected(d)}
                >
                  <div className="cal-day-num">{d}</div>
                  <div className="cal-events">
                    {evs.slice(0, 2).map((e, i) => (
                      <div key={i} className="cal-event">
                        <span className="cal-event-dot" style={{ background: e.color }}/>
                        <span className="cal-event-name">{e.t} · {e.name}</span>
                      </div>
                    ))}
                    {evs.length > 2 && <div className="cal-more">+{evs.length - 2} more</div>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">{selected === today ? 'Today' : `May ${selected}`}</div>
              <div className="card-sub">{todays.length} event{todays.length === 1 ? '' : 's'}</div>
            </div>
          </div>
          {todays.length === 0 ? (
            <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
              No events scheduled.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {todays.map((e, i) => (
                <div key={i} className="schedule-row">
                  <div className="schedule-time">{e.t}</div>
                  <div className="schedule-bar" style={{ background: e.color }}/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="schedule-name">{e.name}</div>
                    <div className="schedule-meta">30 min · Google Meet</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 22, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 10 }}>This week</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
              {[
                { d: 'Mon · May 18', n: '2 events' },
                { d: 'Tue · May 19', n: '0 events' },
                { d: 'Wed · May 20', n: '1 event' },
                { d: 'Thu · May 21', n: '3 events' },
                { d: 'Fri · May 22', n: '1 event' },
              ].map(d => (
                <div key={d.d} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span style={{ color: 'var(--text)' }}>{d.d}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{d.n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   TEAM CHAT
   ========================================================= */
const CHANNELS = [
  { id: 'c1', name: 'sales-emea', count: 8, active: true },
  { id: 'c2', name: 'pipeline-wins', count: 0 },
  { id: 'c3', name: 'customer-success', count: 3 },
  { id: 'c4', name: 'revenue-ops', count: 1 },
  { id: 'c5', name: 'product-feedback' },
  { id: 'c6', name: 'leadership' },
];
const DMS = [
  { id: 'd1', name: 'Amelia Rouse', initials: 'AR', status: 'online' },
  { id: 'd2', name: 'Sun-Ho Kim', initials: 'SK', status: 'away' },
  { id: 'd3', name: 'Devin Vega', initials: 'DV', status: 'offline' },
];
const MESSAGES = [
  { id: 1, who: 'Amelia Rouse', initials: 'AR', time: '9:42', text: "Just got off the call with Aether Bank's procurement team — they're sending the signed contract over today.", reactions: [{ e: '🎉', n: 3 }] },
  { id: 2, who: 'Mira Okafor', initials: 'MO', time: '9:45', text: "Massive. That's the largest deal we've closed in EMEA this quarter. Coffee's on me.", me: true },
  { id: 3, who: 'Sun-Ho Kim', initials: 'SK', time: '9:51', text: "Quick heads up — Vertex Health usage just dropped sharply. I'm pulling the report now but might be worth a CSM touchpoint." },
  { id: 4, who: 'Helix', initials: 'H', time: '9:52', text: "I flagged this earlier. Vertex Health usage is down 38% MTD, driven mostly by their integrations workspace. Two of three power users haven't logged in in 12 days.", ai: true },
  { id: 5, who: 'Amelia Rouse', initials: 'AR', time: '9:53', text: "Good catch. I'll set up a check-in for Thursday and pull their engineering lead into the loop.", attach: { name: 'Vertex-usage-summary.pdf', size: '342 KB' } },
];

function ChatView() {
  const [text, setText] = useState2('');
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Team chat</h1>
          <div className="sub">12 channels · 3 direct messages</div>
        </div>
        <div className="right">
          <button className="btn" onClick={() => window.dispatchEvent(new CustomEvent('helix:toast', { detail: 'Channel creation coming soon' }))}><Icon name="plus" size={13}/> New channel</button>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="chat-grid">
          <aside className="chat-side">
            <div className="chat-side-section">
              <div className="chat-side-title">Channels</div>
              {CHANNELS.map(c => (
                <button key={c.id} className={"chat-side-item" + (c.active ? ' active' : '')}>
                  <span className="chat-hash">#</span>
                  <span className="sb-label">{c.name}</span>
                  {c.count ? <span className="sb-badge">{c.count}</span> : null}
                </button>
              ))}
            </div>
            <div className="chat-side-section">
              <div className="chat-side-title">Direct messages</div>
              {DMS.map(d => (
                <button key={d.id} className="chat-side-item">
                  <span className={"chat-dm-status " + d.status}></span>
                  <span className="sb-label">{d.name}</span>
                </button>
              ))}
            </div>
          </aside>

          <section className="chat-main">
            <div className="chat-header">
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}># sales-emea</div>
                <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>EMEA sales coordination · 14 members</div>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <button className="icon-btn"><Icon name="phone" size={15}/></button>
                <button className="icon-btn"><Icon name="users" size={15}/></button>
                <button className="icon-btn"><Icon name="settings" size={15}/></button>
              </div>
            </div>

            <div className="chat-stream">
              <div className="chat-divider"><span>Today · May 20</span></div>
              {MESSAGES.map(m => (
                <div key={m.id} className={"chat-msg" + (m.me ? ' me' : '') + (m.ai ? ' ai' : '')}>
                  <div className="avatar" style={m.ai ? { background: 'var(--text)', color: 'var(--bg)', borderColor: 'transparent' } : (m.me ? { background: '#475569', color: '#fff', borderColor: 'transparent' } : {})}>
                    {m.ai ? <Icon name="sparkles" size={13}/> : m.initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{m.who}</span>
                      {m.ai && <span className="tag" style={{ background: 'var(--card-hover)', color: 'var(--text-dim)' }}>AI</span>}
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.time}</span>
                    </div>
                    <div className="chat-text">{m.text}</div>
                    {m.attach && (
                      <div className="chat-attach">
                        <Icon name="file" size={14}/>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 500 }}>{m.attach.name}</div>
                          <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{m.attach.size}</div>
                        </div>
                      </div>
                    )}
                    {m.reactions && (
                      <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                        {m.reactions.map((r, i) => (
                          <span key={i} className="chip" style={{ padding: '2px 8px', fontSize: 11 }}>{r.e} {r.n}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="chat-composer">
              <input
                className="search"
                placeholder="Message #sales-emea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ paddingLeft: 14 }}
              />
              <button className="icon-btn" title="Attach"><Icon name="paperclip" size={15}/></button>
              <button className="btn btn-primary" disabled={!text}>Send</button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   SETTINGS
   ========================================================= */
function SettingsView() {
  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'team', label: 'Team' },
    { id: 'billing', label: 'Billing' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' },
  ];
  const [tab, setTab] = useState2('profile');

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Settings</h1>
          <div className="sub">Workspace, account, and integrations</div>
        </div>
      </div>

      <div className="settings-shell">
        <aside className="settings-tabs">
          {tabs.map(t => (
            <button key={t.id} className={"settings-tab" + (tab === t.id ? ' active' : '')} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </aside>

        <div className="settings-body">
          {tab === 'profile' && <ProfilePanel/>}
          {tab === 'team' && <TeamPanel/>}
          {tab === 'billing' && <BillingPanel/>}
          {tab === 'integrations' && <IntegrationsPanel/>}
          {tab === 'notifications' && <NotificationsPanel/>}
          {tab === 'security' && <SecurityPanel/>}
        </div>
      </div>
    </>
  );
}

function SettingRow({ label, hint, children }) {
  return (
    <div className="setting-row">
      <div className="setting-label">
        <div className="setting-label-h">{label}</div>
        {hint && <div className="setting-hint">{hint}</div>}
      </div>
      <div className="setting-control">{children}</div>
    </div>
  );
}

function ProfilePanel() {
  return (
    <div className="card">
      <div className="settings-section">
        <div className="settings-section-h">Profile</div>
        <SettingRow label="Display name" hint="Shown across Helix and on shared deals.">
          <input className="search" defaultValue="Mira Okafor"/>
        </SettingRow>
        <SettingRow label="Email" hint="Used for sign-in and notifications.">
          <input className="search" defaultValue="mira@helix.app"/>
        </SettingRow>
        <SettingRow label="Role" hint="Determines default views.">
          <select className="search">
            <option>Head of Sales</option><option>Account Executive</option><option>Customer Success</option>
          </select>
        </SettingRow>
      </div>
      <div className="settings-section">
        <div className="settings-section-h">Preferences</div>
        <SettingRow label="Timezone">
          <select className="search"><option>UTC+1 · Lagos</option><option>UTC · London</option><option>UTC-5 · NYC</option></select>
        </SettingRow>
        <SettingRow label="Start week on">
          <div className="seg">
            <button className="on">Mon</button><button>Sun</button>
          </div>
        </SettingRow>
        <SettingRow label="Default landing page">
          <select className="search"><option>Dashboard</option><option>Pipeline</option><option>Inbox</option></select>
        </SettingRow>
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '16px 0 0', borderTop: '1px solid var(--border)' }}>
        <button className="btn">Cancel</button>
        <button className="btn btn-primary">Save changes</button>
      </div>
    </div>
  );
}

function TeamPanel() {
  const members = [
    { name: 'Mira Okafor', initials: 'MO', email: 'mira@helix.app', role: 'Owner', status: 'active' },
    { name: 'Amelia Rouse', initials: 'AR', email: 'amelia@helix.app', role: 'Admin', status: 'active' },
    { name: 'Sun-Ho Kim', initials: 'SK', email: 'sunho@helix.app', role: 'Member', status: 'active' },
    { name: 'Devin Vega', initials: 'DV', email: 'devin@helix.app', role: 'Member', status: 'active' },
    { name: 'Lila Tran', initials: 'LT', email: 'lila@helix.app', role: 'Member', status: 'invited' },
  ];
  return (
    <div className="card">
      <div className="card-head">
        <div>
          <div className="card-title">Team members</div>
          <div className="card-sub">5 members · 1 pending invite</div>
        </div>
        <button className="btn btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('helix:toast', { detail: 'Invite link copied to clipboard' }))}><Icon name="plus" size={13}/> Invite</button>
      </div>
      <div className="tbl-wrap">
        <table className="tbl">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {members.map(m => (
              <tr key={m.email}>
                <td>
                  <div className="cust-cell">
                    <div className="avatar" style={{ background: '#475569', color: '#fff', borderColor: 'transparent' }}>{m.initials}</div>
                    <div className="cust-name">{m.name}</div>
                  </div>
                </td>
                <td><span className="cust-mail">{m.email}</span></td>
                <td>{m.role}</td>
                <td><span className={"status " + (m.status === 'active' ? 'active' : 'trial')}>{m.status}</span></td>
                <td><Icon name="more" size={14} style={{ color: 'var(--text-muted)' }}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BillingPanel() {
  return (
    <>
      <div className="card">
        <div className="card-head">
          <div>
            <div className="card-title">Current plan</div>
            <div className="card-sub">Scale · billed annually</div>
          </div>
          <button className="btn">Change plan</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <div className="kpi" style={{ padding: 14 }}>
            <div className="kpi-label">Seats</div>
            <div style={{ fontSize: 22, fontWeight: 600, marginTop: 6 }}>5 <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 400 }}>/ 25</span></div>
            <div style={{ height: 3, background: 'var(--card-hover)', borderRadius: 100, marginTop: 10 }}>
              <div style={{ width: '20%', height: '100%', background: 'var(--text)', borderRadius: 100, opacity: 0.75 }}/>
            </div>
          </div>
          <div className="kpi" style={{ padding: 14 }}>
            <div className="kpi-label">Contacts</div>
            <div style={{ fontSize: 22, fontWeight: 600, marginTop: 6 }}>12,418 <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 400 }}>/ 50K</span></div>
            <div style={{ height: 3, background: 'var(--card-hover)', borderRadius: 100, marginTop: 10 }}>
              <div style={{ width: '25%', height: '100%', background: 'var(--text)', borderRadius: 100, opacity: 0.75 }}/>
            </div>
          </div>
          <div className="kpi" style={{ padding: 14 }}>
            <div className="kpi-label">Automations</div>
            <div style={{ fontSize: 22, fontWeight: 600, marginTop: 6 }}>4 <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 400 }}>/ unlimited</span></div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <div className="card-head">
          <div>
            <div className="card-title">Invoices</div>
            <div className="card-sub">All amounts in USD</div>
          </div>
          <button className="btn"><Icon name="download" size={13}/> Download all</button>
        </div>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Invoice</th><th>Date</th><th style={{ textAlign: 'right' }}>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {[
                { id: 'INV-2026-05', date: 'May 1, 2026', amt: 4990, status: 'paid' },
                { id: 'INV-2026-04', date: 'Apr 1, 2026', amt: 4990, status: 'paid' },
                { id: 'INV-2026-03', date: 'Mar 1, 2026', amt: 4990, status: 'paid' },
                { id: 'INV-2026-02', date: 'Feb 1, 2026', amt: 4490, status: 'paid' },
              ].map(inv => (
                <tr key={inv.id}>
                  <td style={{ fontFamily: 'var(--mono)' }}>{inv.id}</td>
                  <td>{inv.date}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--mono)' }}>${inv.amt.toFixed(2)}</td>
                  <td><span className="status active">{inv.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function IntegrationsPanel() {
  const ints = [
    { name: 'Gmail', desc: 'Sync email threads to contacts', on: true },
    { name: 'Google Calendar', desc: 'Two-way meeting sync', on: true },
    { name: 'Slack', desc: 'Send deal updates to channels', on: true },
    { name: 'Stripe', desc: 'Pull subscription + invoice data', on: true },
    { name: 'Zapier', desc: 'Connect 5000+ apps', on: false },
    { name: 'Salesforce', desc: 'Migrate contacts and deals', on: false },
    { name: 'HubSpot', desc: 'Two-way contact sync', on: false },
    { name: 'Linear', desc: 'Link product feedback to issues', on: false },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
      {ints.map(i => (
        <div key={i.name} className="card" style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ width: 40, height: 40, borderRadius: 9, background: 'var(--card-hover)', border: '1px solid var(--border)', display: 'grid', placeItems: 'center', fontSize: 14, fontWeight: 600 }}>
            {i.name[0]}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{i.name}</div>
            <div style={{ fontSize: 11.5, color: 'var(--text-dim)' }}>{i.desc}</div>
          </div>
          <button className={"flow-toggle" + (i.on ? ' on' : '')}><i/></button>
        </div>
      ))}
    </div>
  );
}

function NotificationsPanel() {
  const rows = [
    { lbl: 'Deal stage changes', email: true, push: true, slack: true },
    { lbl: 'New leads assigned to me', email: true, push: true, slack: false },
    { lbl: 'Mentions in comments', email: true, push: true, slack: true },
    { lbl: 'Daily digest', email: true, push: false, slack: false },
    { lbl: 'Weekly performance summary', email: true, push: false, slack: false },
    { lbl: 'Helix AI insights', email: false, push: true, slack: false },
  ];
  return (
    <div className="card">
      <div className="card-head">
        <div>
          <div className="card-title">Notification preferences</div>
          <div className="card-sub">Choose how and where you want to be notified.</div>
        </div>
      </div>
      <div className="tbl-wrap">
        <table className="tbl">
          <thead><tr><th>Event</th><th style={{ textAlign: 'center' }}>Email</th><th style={{ textAlign: 'center' }}>Push</th><th style={{ textAlign: 'center' }}>Slack</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.lbl}>
                <td><div className="cust-name">{r.lbl}</div></td>
                <td style={{ textAlign: 'center' }}><button className={"flow-toggle" + (r.email ? ' on' : '')}><i/></button></td>
                <td style={{ textAlign: 'center' }}><button className={"flow-toggle" + (r.push ? ' on' : '')}><i/></button></td>
                <td style={{ textAlign: 'center' }}><button className={"flow-toggle" + (r.slack ? ' on' : '')}><i/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SecurityPanel() {
  return (
    <>
      <div className="card">
        <div className="settings-section">
          <div className="settings-section-h">Authentication</div>
          <SettingRow label="Two-factor authentication" hint="Use an authenticator app on sign-in."><button className="flow-toggle on"><i/></button></SettingRow>
          <SettingRow label="Single sign-on" hint="Enforce SSO for all members."><button className="flow-toggle"><i/></button></SettingRow>
          <SettingRow label="Recovery codes" hint="Print and store offline.">
            <button className="btn">View codes</button>
          </SettingRow>
        </div>
      </div>
      <div className="card" style={{ marginTop: 14 }}>
        <div className="settings-section">
          <div className="settings-section-h">Active sessions</div>
          {[
            { device: 'MacBook Pro · Chrome', loc: 'Lagos, NG', when: 'Active now' },
            { device: 'iPhone 15 · Safari', loc: 'Lagos, NG', when: '2 hours ago' },
            { device: 'Windows · Firefox', loc: 'London, UK', when: '3 days ago' },
          ].map((s, i) => (
            <div key={i} className="setting-row" style={{ borderTop: i === 0 ? 'none' : undefined }}>
              <div>
                <div className="setting-label-h">{s.device}</div>
                <div className="setting-hint">{s.loc} · {s.when}</div>
              </div>
              <button className="btn">Revoke</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

window.CalendarView = CalendarView;
window.ChatView = ChatView;
window.SettingsView = SettingsView;
