/* global React, Icon, HELIX_DATA */
const { useState, useMemo } = React;

/* =========================================================
   INBOX
   ========================================================= */
const THREADS = [
  { id: 't1', from: 'Priya Raman', co: 'Vertex Health', subject: 'Re: Custom integration scoping', preview: 'Thanks for the call yesterday. I had a chance to share the spec with our engineering lead and they have a few questions about the webhook retry behavior…', time: '2h', unread: true, starred: true, label: 'deal' },
  { id: 't2', from: 'Henrik Sørensen', co: 'Atlas Freight', subject: 'Renewal — pricing question', preview: 'Quick one before the renewal call: can you confirm whether the per-seat add-on is prorated if we onboard mid-cycle?', time: '4h', unread: true, label: 'billing' },
  { id: 't3', from: 'Sara Ben-Ami', co: 'Aether Bank', subject: 'Procurement signoff status', preview: 'Procurement has approved the contract. Sending you the signed PDF now — the W-9 we have on file is current.', time: '6h', unread: true, label: 'deal' },
  { id: 't4', from: 'Lucas Reinhardt', co: 'Wavelet AI', subject: 'Workflow templates feedback', preview: 'The team has been using the new templates for two weeks. Some quick wins and a few rough edges I want to flag.', time: 'yest.', unread: false, starred: true, label: 'feedback' },
  { id: 't5', from: 'Theo Beaumont', co: 'Glasswing Studio', subject: 'Trial extension?', preview: 'We are close to a decision but need another two weeks to align with our annual planning. Any way to extend the trial?', time: 'yest.', unread: false, label: 'trial' },
  { id: 't6', from: 'Marco Esposito', co: 'Pinecone Logistics', subject: 'Demo follow-up', preview: 'Great session today. I have shared the recording internally — could you send over the security overview as a follow-up?', time: '2d', unread: false, label: 'demo' },
  { id: 't7', from: 'Yuki Tanaka', co: 'Orbit Studios', subject: 'Add-on seats invoice', preview: 'Could you re-issue Aug invoice with our Tokyo billing address? Details attached.', time: '3d', unread: false, label: 'billing' },
];

function InboxView() {
  const [filter, setFilter] = useState('all');
  const [activeId, setActiveId] = useState('t1');
  const filtered = useMemo(() => {
    if (filter === 'unread') return THREADS.filter(t => t.unread);
    if (filter === 'starred') return THREADS.filter(t => t.starred);
    return THREADS;
  }, [filter]);
  const active = THREADS.find(t => t.id === activeId) || filtered[0];

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Inbox</h1>
          <div className="sub">8 unread · 2 starred · synced 1 min ago</div>
        </div>
        <div className="right">
          <button className="btn"><Icon name="filter" size={13}/> Filter</button>
          <button className="btn btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('helix:compose'))}><Icon name="plus" size={13}/> Compose</button>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="inbox-grid">
          <div className="inbox-list">
            <div className="inbox-list-head">
              <div className="seg" style={{ width: '100%' }}>
                {[
                  { id: 'all', label: 'All' },
                  { id: 'unread', label: 'Unread' },
                  { id: 'starred', label: 'Starred' },
                ].map(t => (
                  <button key={t.id} className={filter === t.id ? 'on' : ''} onClick={() => setFilter(t.id)} style={{ flex: 1 }}>{t.label}</button>
                ))}
              </div>
            </div>
            <div className="inbox-threads">
              {filtered.map(t => (
                <button key={t.id} className={"thread" + (activeId === t.id ? ' active' : '') + (t.unread ? ' unread' : '')} onClick={() => setActiveId(t.id)}>
                  <div className="thread-row1">
                    <div className="avatar" style={{ width: 28, height: 28, fontSize: 11 }}>{initials(t.from)}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="thread-from">{t.from}</div>
                      <div className="thread-co">{t.co}</div>
                    </div>
                    <div className="thread-time">{t.time}</div>
                  </div>
                  <div className="thread-subject">{t.subject}</div>
                  <div className="thread-preview">{t.preview}</div>
                  <div className="thread-foot">
                    <span className="tag" style={{ background: 'var(--card-hover)', color: 'var(--text-dim)' }}>{t.label}</span>
                    {t.starred && <Icon name="star" size={12} style={{ color: 'var(--amber)', fill: 'var(--amber)' }}/>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="inbox-detail">
            {active && (
              <>
                <div className="inbox-detail-head">
                  <div>
                    <div className="inbox-subject">{active.subject}</div>
                    <div className="inbox-meta">
                      <span className="tag">{active.label}</span>
                      <span style={{ color: 'var(--text-dim)', fontSize: 12 }}>{active.from} · {active.co}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button className="icon-btn"><Icon name="return" size={15}/></button>
                    <button className="icon-btn"><Icon name="star" size={15}/></button>
                    <button className="icon-btn"><Icon name="more" size={15}/></button>
                  </div>
                </div>
                <div className="inbox-body">
                  <div className="msg">
                    <div className="msg-head">
                      <div className="avatar">{initials(active.from)}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{active.from} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>· {active.co}</span></div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>to me · {active.time} ago</div>
                      </div>
                    </div>
                    <div className="msg-body">
                      <p>{active.preview}</p>
                      <p>A couple of specifics we'd want to nail down before signing off:</p>
                      <ul>
                        <li>Webhook retry behavior on 5xx responses — is there an exponential backoff or fixed interval?</li>
                        <li>Whether the events API supports filtering by metadata at the source.</li>
                        <li>Rough cost expectation at 4× our current volume.</li>
                      </ul>
                      <p>Happy to set up a 30-minute call this week if it's easier to walk through.</p>
                      <p style={{ color: 'var(--text-dim)' }}>—<br/>{active.from}<br/>{active.co}</p>
                    </div>
                  </div>

                  <div className="msg-ai">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <div className="ai-orb" style={{ width: 20, height: 20, borderRadius: 5 }}>
                        <Icon name="sparkles" size={11} style={{ color: 'var(--bg)' }}/>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600 }}>Helix suggestion</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 13, color: 'var(--text-dim)' }}>This looks like a deal-progression email. Auto-draft a response with answers pulled from the API docs and tag the engineering team for verification?</p>
                    <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                      <button className="ai-pill">Draft reply</button>
                      <button className="ai-pill">Schedule call</button>
                      <button className="ai-pill">Dismiss</button>
                    </div>
                  </div>
                </div>
                <div className="inbox-reply">
                  <input className="search" placeholder="Reply to thread…" style={{ paddingLeft: 14 }}/>
                  <button className="btn btn-primary">Send</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function initials(name) {
  return name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
}

/* =========================================================
   REPORTS
   ========================================================= */
const REPORTS = [
  { id: 'r1', name: 'Weekly revenue summary', kind: 'Financial', cadence: 'Weekly · Mon 9am', owner: 'AR', val: '$184,230', delta: '+12.4%', dir: 'up', spark: [12,14,15,18,19,22,24,23,27,30,32,34] },
  { id: 'r2', name: 'Pipeline health by stage', kind: 'Sales', cadence: 'Daily', owner: 'MO', val: '$1.24M', delta: '+8.1%', dir: 'up', spark: [82,84,86,88,90,93,98,102,108,112,118,124] },
  { id: 'r3', name: 'Win-rate by source', kind: 'Sales', cadence: 'Monthly', owner: 'SK', val: '31.2%', delta: '+2.4%', dir: 'up', spark: [22,24,26,25,27,28,29,30,30,31,31,31] },
  { id: 'r4', name: 'Churn — at-risk accounts', kind: 'Customer', cadence: 'Real-time', owner: 'DV', val: '4 accounts', delta: '+1', dir: 'down', spark: [2,2,2,3,3,3,4,4,4,4,4,4] },
  { id: 'r5', name: 'Sales cycle length', kind: 'Sales', cadence: 'Monthly', owner: 'AR', val: '32 days', delta: '-4 days', dir: 'up', spark: [40,39,38,37,36,36,35,34,33,33,32,32] },
  { id: 'r6', name: 'Activation conversion', kind: 'Product', cadence: 'Daily', owner: 'MO', val: '12.8%', delta: '-0.6%', dir: 'down', spark: [14,14,13,13,13,13,13,12,12,12,12,12] },
];

function ReportsView() {
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Reports</h1>
          <div className="sub">6 saved reports · 2 scheduled to your inbox</div>
        </div>
        <div className="right">
          <div className="seg">
            <button className="on">Grid</button>
            <button>List</button>
          </div>
          <button className="btn"><Icon name="filter" size={13}/> Filter</button>
          <button className="btn btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('helix:toast', { detail: 'Report builder — coming soon' }))}><Icon name="plus" size={13}/> New report</button>
        </div>
      </div>

      <div className="row r-2-1 stagger">
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Q3 forecast vs. actual</div>
              <div className="card-sub">Pipeline-weighted projection · 12-week view</div>
            </div>
            <div className="chart-legend">
              <span><span className="dot" style={{ background: 'var(--accent)' }}/>Actual</span>
              <span><span className="dot" style={{ background: 'var(--text-muted)' }}/>Forecast</span>
            </div>
          </div>
          {React.createElement(window.RevenueChart, { data: HELIX_DATA.REV_THIS, prev: HELIX_DATA.REV_LAST, labels: HELIX_DATA.MONTHS })}
        </div>
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Top performers</div>
              <div className="card-sub">By closed-won, this quarter</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { name: 'Amelia Rouse',    initials: 'AR', val: '$412k', deals: 14, pct: 100 },
              { name: 'Mira Okafor',     initials: 'MO', val: '$348k', deals: 11, pct: 84 },
              { name: 'Sun-Ho Kim',      initials: 'SK', val: '$222k', deals: 9,  pct: 54 },
              { name: 'Devin Vega',      initials: 'DV', val: '$184k', deals: 7,  pct: 45 },
            ].map(p => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="avatar" style={{ background: '#475569', color: '#fff', borderColor: 'transparent' }}>{p.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 500 }}>
                    <span>{p.name}</span>
                    <span style={{ fontFamily: 'var(--mono)' }}>{p.val}</span>
                  </div>
                  <div style={{ height: 3, background: 'var(--card-hover)', borderRadius: 100, marginTop: 6, overflow: 'hidden' }}>
                    <div style={{ width: `${p.pct}%`, height: '100%', background: 'var(--text)', opacity: 0.75, transition: 'width 0.6s ease' }}/>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{p.deals} closed-won deals</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="report-grid stagger">
        {REPORTS.map(r => (
          <div key={r.id} className="card report-card">
            <div className="report-head">
              <div>
                <div className="report-name">{r.name}</div>
                <div className="report-cadence">
                  <span className="status active" style={{ background: 'var(--card-hover)', color: 'var(--text-dim)' }}>{r.kind}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.cadence}</span>
                </div>
              </div>
              <button className="icon-btn" style={{ width: 28, height: 28 }}><Icon name="more" size={14}/></button>
            </div>
            <div className="report-val">
              <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', fontFamily: r.val.includes('$') ? 'var(--mono)' : 'inherit', fontFeatureSettings: '"tnum"' }}>{r.val}</div>
              <span className={"delta " + r.dir}>
                <Icon name={r.dir === 'up' ? 'arrowUp' : 'arrowDown'} size={11}/>{r.delta}
              </span>
            </div>
            {React.createElement(window.Sparkline, { data: r.spark, width: 220, height: 36, color: 'var(--accent)' })}
            <div className="report-foot">
              <div className="avatar" style={{ width: 22, height: 22, fontSize: 9, background: '#475569', color: '#fff', borderColor: 'transparent' }}>{r.owner}</div>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', flex: 1 }}>last run 12m ago</span>
              <button className="chip">Open</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* =========================================================
   AUTOMATIONS
   ========================================================= */
const AUTOS = [
  { id: 'a1', name: 'New trial → onboarding sequence', status: 'active', trigger: 'Signup created', actions: ['Send welcome', 'Schedule call', 'Create task'], runs: 1284, lastRun: '12s ago' },
  { id: 'a2', name: 'High-intent lead → SDR assignment', status: 'active', trigger: 'Pricing page visit', actions: ['Score lead', 'Assign owner', 'Slack alert'], runs: 612, lastRun: '3m ago' },
  { id: 'a3', name: 'Churn risk → CSM playbook', status: 'active', trigger: 'Usage drop > 30%', actions: ['Create ticket', 'Notify CSM', 'Schedule QBR'], runs: 92, lastRun: '1h ago' },
  { id: 'a4', name: 'Stalled deal → re-engagement', status: 'paused', trigger: 'No activity 14d', actions: ['Send check-in', 'Bump task'], runs: 348, lastRun: 'yesterday' },
  { id: 'a5', name: 'Closed-won → handoff', status: 'active', trigger: 'Deal moved to Won', actions: ['Create CSM task', 'Send celebration', 'Update CRM'], runs: 47, lastRun: '4h ago' },
  { id: 'a6', name: 'Trial expiring → conversion offer', status: 'draft', trigger: 'Trial ends in 3d', actions: ['Send offer email', 'Notify rep'], runs: 0, lastRun: '—' },
];

function AutomationsView() {
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Automations</h1>
          <div className="sub">{AUTOS.filter(a => a.status === 'active').length} active · {AUTOS.reduce((s, a) => s + a.runs, 0).toLocaleString()} runs this month</div>
        </div>
        <div className="right">
          <button className="btn"><Icon name="filter" size={13}/> Filter</button>
          <button className="btn btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('helix:new-automation'))}><Icon name="plus" size={13}/> New automation</button>
        </div>
      </div>

      <div className="kpis stagger">
        {[
          { lbl: 'Active workflows', val: '4' },
          { lbl: 'Runs this month', val: '2,383' },
          { lbl: 'Success rate', val: '98.7%' },
          { lbl: 'Hours saved', val: '184' },
        ].map(k => (
          <div key={k.lbl} className="kpi">
            <div className="kpi-label">{k.lbl}</div>
            <div className="kpi-val" style={{ marginTop: 8 }}>{k.val}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 0 }}>
        {AUTOS.map((a, i) => (
          <div key={a.id} className="auto-row" style={{ borderTop: i === 0 ? 'none' : '1px solid var(--border)' }}>
            <div className="auto-toggle">
              <button className={"flow-toggle" + (a.status === 'active' ? ' on' : '')} aria-label="Toggle">
                <i/>
              </button>
            </div>
            <div className="auto-meta">
              <div className="auto-name">{a.name}</div>
              <div className="auto-chain">
                <span className="auto-trigger">When {a.trigger}</span>
                <Icon name="chevronRight" size={11} style={{ color: 'var(--text-muted)' }}/>
                <div className="auto-actions">
                  {a.actions.map((ac, j) => (
                    <span key={j} className="auto-action">{ac}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="auto-stats">
              <div>
                <div className="auto-stat-val">{a.runs.toLocaleString()}</div>
                <div className="auto-stat-lbl">runs</div>
              </div>
              <div>
                <div className="auto-stat-val">{a.lastRun}</div>
                <div className="auto-stat-lbl">last run</div>
              </div>
              <span className={"status " + (a.status === 'active' ? 'active' : a.status === 'paused' ? 'trial' : 'lead')}>{a.status}</span>
              <button className="icon-btn"><Icon name="more" size={14}/></button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

window.InboxView = InboxView;
window.ReportsView = ReportsView;
window.AutomationsView = AutomationsView;
