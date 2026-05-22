/* global React, ReactDOM, Icon, Sidebar, Topbar, Pipeline, CustomersTable, CustomerDrawer, AIInsights, ActivityFeed, CommandPalette, Toasts, useToasts, Counter, Sparkline, RevenueChart, GrowthChart, DonutChart, TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakToggle, TweakSelect, TweakSlider, TweakColor, HELIX_DATA */

const { useState, useEffect, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "accentPreset": "indigo",
  "density": "comfy",
  "sidebar": "expanded",
  "showAI": true
}/*EDITMODE-END*/;

const ACCENT_PRESETS = {
  indigo:  { a1: '#6366F1' },
  emerald: { a1: '#10B981' },
  rose:    { a1: '#E11D48' },
  amber:   { a1: '#D97706' },
  slate:   { a1: '#475569' },
};

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const [page, setPage] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [deals, setDeals] = useState(HELIX_DATA.SEED_DEALS);
  const { toasts, push } = useToasts();

  // Modal + popover state
  const [aiOpen, setAiOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [wsOpen, setWsOpen] = useState(false);
  const [newDealOpen, setNewDealOpen] = useState(false);
  const [newContactOpen, setNewContactOpen] = useState(false);
  const [newEventOpen, setNewEventOpen] = useState(false);
  const [newAutoOpen, setNewAutoOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [confirmCfg, setConfirmCfg] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  // theme application
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tweaks.theme);
  }, [tweaks.theme]);

  useEffect(() => {
    const root = document.documentElement;
    const p = ACCENT_PRESETS[tweaks.accentPreset] || ACCENT_PRESETS.indigo;
    root.style.setProperty('--a1', p.a1);
    root.style.setProperty('--a2', p.a1);
    root.style.setProperty('--a3', p.a1);
    root.style.setProperty('--accent', p.a1);
  }, [tweaks.accentPreset]);

  useEffect(() => {
    document.documentElement.style.setProperty('--density', tweaks.density === 'compact' ? '0.8' : tweaks.density === 'spacious' ? '1.15' : '1');
  }, [tweaks.density]);

  // sidebar collapse from tweak
  useEffect(() => {
    setCollapsed(tweaks.sidebar === 'collapsed');
  }, [tweaks.sidebar]);

  // keyboard shortcuts: cmd+k, gd/gp/gc...
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 't') {
        e.preventDefault();
        setTweak('theme', tweaks.theme === 'dark' ? 'light' : 'dark');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [tweaks.theme]);

  useEffect(() => {
    const open = () => setPaletteOpen(true);
    window.addEventListener('helix:openpalette', open);
    return () => window.removeEventListener('helix:openpalette', open);
  }, []);

  // Global event bus for "create X" actions — any view can dispatch these
  useEffect(() => {
    const handlers = {
      'helix:new-deal':       () => setNewDealOpen(true),
      'helix:new-contact':    () => setNewContactOpen(true),
      'helix:new-event':      () => setNewEventOpen(true),
      'helix:new-automation': () => setNewAutoOpen(true),
      'helix:compose':        () => setComposeOpen(true),
      'helix:open-ai':        () => setAiOpen(true),
      'helix:confirm':        (e) => setConfirmCfg(e.detail),
      'helix:toast':          (e) => push(e.detail),
    };
    Object.entries(handlers).forEach(([k, fn]) => window.addEventListener(k, fn));
    return () => Object.entries(handlers).forEach(([k, fn]) => window.removeEventListener(k, fn));
  }, [push]);

  return (
    <div className="app" data-screen-label="00 CRM Shell">
      <Sidebar
        active={page}
        onChange={(p) => { setPage(p); setMobileNavOpen(false); }}
        collapsed={collapsed}
        onToggle={() => { setCollapsed(c => !c); setTweak('sidebar', !collapsed ? 'collapsed' : 'expanded'); }}
        onCreate={() => setPaletteOpen(true)}
        wsOpen={wsOpen}
        onToggleWs={() => setWsOpen(o => !o)}
        userOpen={userOpen}
        onToggleUser={() => setUserOpen(o => !o)}
        push={push}
        mobileOpen={mobileNavOpen}
      />
      <div className={"mobile-backdrop" + (mobileNavOpen ? " open" : "")} onClick={() => setMobileNavOpen(false)}></div>
      <main className="main">
        <Topbar
          page={page}
          onToggleAI={() => setAiOpen(o => !o)}
          onToggleTheme={() => setTweak('theme', tweaks.theme === 'dark' ? 'light' : 'dark')}
          theme={tweaks.theme}
          onOpenPalette={() => setPaletteOpen(true)}
          notifOpen={notifOpen}
          onToggleNotif={() => setNotifOpen(o => !o)}
          onCloseNotif={() => setNotifOpen(false)}
          userOpen={userOpen}
          onToggleUser={() => setUserOpen(o => !o)}
          onCloseUser={() => setUserOpen(false)}
          onNavigate={setPage}
          push={push}
          onToggleMobile={() => setMobileNavOpen(o => !o)}
        />

        <div className="page">
          <div className="page-inner">
            {page === 'dashboard' && <DashboardView push={push} deals={deals} setDeals={setDeals} showAI={tweaks.showAI}/>}
            {page === 'pipeline' && <PipelineView deals={deals} setDeals={setDeals}/>}
            {page === 'contacts' && <ContactsView onSelect={setSelectedCustomer}/>}
            {page === 'deals' && <DealsView deals={deals} setDeals={setDeals}/>}
            {page === 'inbox' && <window.InboxView/>}
            {page === 'reports' && <window.ReportsView/>}
            {page === 'automations' && <window.AutomationsView/>}
            {page === 'calendar' && <window.CalendarView/>}
            {page === 'chat' && <window.ChatView/>}
            {page === 'settings' && <window.SettingsView/>}
            {page === 'components' && <window.ComponentsView/>}
          </div>
        </div>
      </main>

      <CustomerDrawer customer={selectedCustomer} onClose={() => setSelectedCustomer(null)}/>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onNavigate={(p) => setPage(p)}/>
      <Toasts toasts={toasts}/>

      {/* Modals */}
      <window.NewDealModal open={newDealOpen} onClose={() => setNewDealOpen(false)} onCreate={(d) => {
        setDeals(prev => ({ ...prev, [d.stage]: [d, ...(prev[d.stage] || [])] }));
        push(`Deal "${d.name}" added to ${d.stage}`);
      }}/>
      <window.NewContactModal open={newContactOpen} onClose={() => setNewContactOpen(false)} onCreate={(c) => push(`${c.name} added as ${c.status}`)}/>
      <window.NewEventModal open={newEventOpen} onClose={() => setNewEventOpen(false)} onCreate={(e) => push(`Event "${e.title}" scheduled`)}/>
      <window.NewAutomationModal open={newAutoOpen} onClose={() => setNewAutoOpen(false)} onCreate={(a) => push(`Automation "${a.name}" created`)}/>
      <window.ComposeModal open={composeOpen} onClose={() => setComposeOpen(false)} onSend={(m) => push(`Message sent to ${m.to}`)}/>
      {confirmCfg && (
        <window.ConfirmDialog
          open={!!confirmCfg}
          onClose={() => setConfirmCfg(null)}
          onConfirm={confirmCfg.onConfirm}
          title={confirmCfg.title}
          message={confirmCfg.message}
          confirmLabel={confirmCfg.confirmLabel}
          destructive={confirmCfg.destructive}
        />
      )}

      {/* AI assistant panel */}
      <window.AIAssistantPanel open={aiOpen} onClose={() => setAiOpen(false)} push={push}/>

      {/* Help widget */}
      <window.HelpWidget/>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Appearance">
          <TweakRadio label="Theme" value={tweaks.theme} onChange={(v) => setTweak('theme', v)} options={[{ value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }]}/>
          <TweakSelect label="Accent" value={tweaks.accentPreset} onChange={(v) => setTweak('accentPreset', v)} options={[
            { value: 'indigo', label: 'Indigo' },
            { value: 'emerald', label: 'Emerald' },
            { value: 'rose', label: 'Rose' },
            { value: 'amber', label: 'Amber' },
            { value: 'slate', label: 'Slate' },
          ]}/>
          <TweakRadio label="Density" value={tweaks.density} onChange={(v) => setTweak('density', v)} options={[
            { value: 'compact', label: 'Compact' }, { value: 'comfy', label: 'Comfy' }, { value: 'spacious', label: 'Spacious' }
          ]}/>
        </TweakSection>
        <TweakSection title="Layout">
          <TweakRadio label="Sidebar" value={tweaks.sidebar} onChange={(v) => setTweak('sidebar', v)} options={[
            { value: 'expanded', label: 'Expanded' }, { value: 'collapsed', label: 'Collapsed' }
          ]}/>
          <TweakToggle label="Show AI insights" value={tweaks.showAI} onChange={(v) => setTweak('showAI', v)}/>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

/* ============ DASHBOARD VIEW ============ */
function DashboardView({ push, deals, setDeals, showAI }) {
  const [range, setRange] = useState('30d');
  const kpis = [
    { label: 'Revenue (MRR)', value: 184230, prefix: '$', delta: 12.4, dir: 'up', icon: 'money', spark: [12,14,16,15,18,19,22,24,23,27,30,32], color: 'var(--accent)' },
    { label: 'Active customers', value: 2418, delta: 4.8, dir: 'up', icon: 'users', spark: [22,24,23,26,28,29,31,34,33,36,38,41], color: 'var(--text-dim)' },
    { label: 'Conversion rate', value: 3.42, suffix: '%', decimals: 2, delta: 0.6, dir: 'up', icon: 'target', spark: [2.8,3.0,2.9,3.1,3.2,3.0,3.3,3.4,3.5,3.3,3.4,3.4], color: 'var(--text-dim)' },
    { label: 'Avg deal size', value: 8420, prefix: '$', delta: 2.1, dir: 'down', icon: 'trend', spark: [8.6,8.5,8.7,8.8,8.6,8.5,8.4,8.3,8.4,8.5,8.4,8.4], color: 'var(--text-dim)' },
  ];

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Good morning, Mira</h1>
          <div className="sub">Here's what's happening across your pipeline today.</div>
        </div>
        <div className="right">
          <div className="seg">
            {['7d','30d','90d','12m'].map(r => (
              <button key={r} className={range === r ? 'on' : ''} onClick={() => setRange(r)}>{r.toUpperCase()}</button>
            ))}
          </div>
          <button className="btn"><Icon name="download" size={13}/> Export</button>
          <button className="btn btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('helix:new-deal'))}><Icon name="plus" size={13}/> New deal</button>
        </div>
      </div>

      <div className="kpis stagger">
        {kpis.map(k => (
          <KpiCard key={k.label} {...k}/>
        ))}
      </div>

      <div className="row r-2-1 stagger">
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Revenue performance</div>
              <div className="card-sub">Recurring revenue · current vs prior year</div>
            </div>
            <div className="chart-legend">
              <span><span className="dot" style={{ background: 'var(--accent)' }}/>This year</span>
              <span><span className="dot" style={{ background: 'var(--text-muted)' }}/>Last year</span>
            </div>
          </div>
          <RevenueChart data={HELIX_DATA.REV_THIS} prev={HELIX_DATA.REV_LAST} labels={HELIX_DATA.MONTHS}/>
        </div>
        {showAI ? <AIInsights/> : (
          <div className="card">
            <div className="card-head"><div className="card-title">Plan distribution</div></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
              <DonutChart segments={[
                { value: 6, color: 'var(--text)', label: 'Enterprise' },
                { value: 12, color: 'var(--text-dim)', label: 'Scale' },
                { value: 28, color: 'var(--text-muted)', label: 'Pro' },
                { value: 8, color: 'var(--border-strong)', label: 'Trial' },
              ]}/>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { c: 'var(--text)', n: 'Enterprise', v: 6 },
                  { c: 'var(--text-dim)', n: 'Scale', v: 12 },
                  { c: 'var(--text-muted)', n: 'Pro', v: 28 },
                  { c: 'var(--border-strong)', n: 'Trial', v: 8 },
                ].map(s => (
                  <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: s.c }}/>
                    <span style={{ color: 'var(--text-dim)', flex: 1 }}>{s.n}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontWeight: 500 }}>{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="row r-2-1 stagger">
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Conversion funnel</div>
              <div className="card-sub">Last 30 days · all sources</div>
            </div>
            <button className="chip"><Icon name="filter" size={12}/> All sources</button>
          </div>
          <div className="funnel">
            {HELIX_DATA.FUNNEL.map((f, i) => (
              <div key={f.label} className="funnel-row">
                <div className="funnel-label">{f.label}</div>
                <div className="funnel-bar-wrap">
                  <div className="funnel-bar" style={{ width: `${f.pct}%`, animationDelay: `${i*0.08}s` }}/>
                  <span className="funnel-val">{f.value.toLocaleString()}</span>
                </div>
                <div className="funnel-pct">{f.pct.toFixed(1)}%</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Activity</div>
              <div className="card-sub">Live · last hour</div>
            </div>
            <button className="chip">All</button>
          </div>
          <ActivityFeed items={HELIX_DATA.ACTIVITY}/>
        </div>
      </div>

      <div className="row r-1-1 stagger">
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Customer growth</div>
              <div className="card-sub">New accounts · monthly</div>
            </div>
          </div>
          <GrowthChart data={[28,34,32,42,49,55,58,64,72,78,85,92]} labels={HELIX_DATA.MONTHS}/>
        </div>
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Team activity</div>
              <div className="card-sub">Avg. deal-touch frequency · UTC</div>
            </div>
          </div>
          <Heatmap data={HELIX_DATA.HEAT}/>
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <div>
            <div className="card-title">Pipeline this week</div>
            <div className="card-sub">Drag deals between stages</div>
          </div>
          <button className="btn" onClick={() => window.dispatchEvent(new CustomEvent('helix:toast', { detail: 'Stage builder — coming soon' }))}><Icon name="plus" size={12}/> Stage</button>
        </div>
        <Pipeline deals={deals} setDeals={setDeals} stages={HELIX_DATA.STAGES}/>
      </div>
    </>
  );
}

function KpiCard({ label, value, prefix = '', suffix = '', decimals = 0, delta, dir, icon, spark, color }) {
  const ref = React.useRef(null);
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <div className="kpi" ref={ref} onMouseMove={onMove}>
      <div className="kpi-top">
        <div className="kpi-label">{label}</div>
        <div className="kpi-ic"><Icon name={icon} size={15}/></div>
      </div>
      <div className="kpi-val">
        <Counter to={value} prefix={prefix} suffix={suffix} decimals={decimals}/>
      </div>
      <div className="kpi-foot">
        <span className={"delta " + dir}>
          <Icon name={dir === 'up' ? 'arrowUp' : 'arrowDown'} size={11}/>
          {delta}%
        </span>
        <span className="vs">vs last period</span>
      </div>
      <Sparkline data={spark} color={color}/>
    </div>
  );
}

function Heatmap({ data }) {
  const days = ['M','T','W','T','F','S','S'];
  return (
    <div>
      <div style={{ display: 'flex', gap: 6 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'space-between', paddingTop: 0, fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>
          {days.map((d, i) => <div key={i} style={{ height: 18, display: 'grid', alignItems: 'center' }}>{d}</div>)}
        </div>
        <div style={{ flex: 1 }}>
          <div className="heat">
            {data.flatMap((row, ri) =>
              row.map((v, ci) => (
                <div key={`${ri}-${ci}`} className="heat-cell" style={{ '--v': v }} title={`${days[ri]} ${ci}:00 · ${(v*100|0)}%`}/>
              ))
            )}
          </div>
          <div className="heat-axis">
            <span>00</span><span>06</span><span>12</span><span>18</span><span>23</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12, fontSize: 11, color: 'var(--text-muted)' }}>
        <span>Less</span>
        {[0.1, 0.3, 0.5, 0.7, 0.9].map((v,i) => (
          <div key={i} style={{ width: 14, height: 14, borderRadius: 3, background: `rgba(99,102,241,${v*0.9+0.04})` }}/>
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

/* ============ PIPELINE VIEW ============ */
function PipelineView({ deals, setDeals }) {
  const totalValue = Object.values(deals).flat().reduce((s, d) => s + d.value, 0);
  const totalCount = Object.values(deals).flat().length;
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Pipeline</h1>
          <div className="sub">{totalCount} active deals · <span style={{ color: 'var(--text)', fontFamily: 'var(--mono)' }}>${totalValue.toLocaleString()}</span> weighted</div>
        </div>
        <div className="right">
          <div className="seg">
            <button className="on">Board</button>
            <button>List</button>
            <button>Forecast</button>
          </div>
          <button className="btn"><Icon name="filter" size={13}/> Filter</button>
          <button className="btn btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('helix:new-deal'))}><Icon name="plus" size={13}/> New deal</button>
        </div>
      </div>
      <Pipeline deals={deals} setDeals={setDeals} stages={HELIX_DATA.STAGES}/>
    </>
  );
}

/* ============ CONTACTS VIEW ============ */
function ContactsView({ onSelect }) {
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Contacts</h1>
          <div className="sub">All customers across active and historical engagements.</div>
        </div>
        <div className="right">
          <button className="btn"><Icon name="download" size={13}/> Export</button>
          <button className="btn btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('helix:new-contact'))}><Icon name="plus" size={13}/> Add contact</button>
        </div>
      </div>
      <div className="card">
        <CustomersTable rows={HELIX_DATA.CUSTOMERS} onSelect={onSelect}/>
      </div>
    </>
  );
}

/* ============ DEALS VIEW (list) ============ */
function DealsView({ deals }) {
  const flat = Object.entries(deals).flatMap(([stage, list]) => list.map(d => ({ ...d, stage })));
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Deals</h1>
          <div className="sub">{flat.length} deals across {Object.keys(deals).length} stages</div>
        </div>
        <div className="right">
          <button className="btn btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('helix:new-deal'))}><Icon name="plus" size={13}/> New deal</button>
        </div>
      </div>
      <div className="card">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr><th>Deal</th><th>Company</th><th>Stage</th><th style={{ textAlign: 'right' }}>Value</th><th>Tag</th><th>Owners</th></tr>
            </thead>
            <tbody>
              {flat.map(d => {
                const stage = HELIX_DATA.STAGES.find(s => s.id === d.stage);
                return (
                  <tr key={d.id}>
                    <td><div className="cust-name">{d.name}</div></td>
                    <td>{d.co}</td>
                    <td><span className="status active" style={{ color: stage.color, background: stage.color + '26' }}>{stage.name}</span></td>
                    <td style={{ textAlign: 'right', fontFamily: 'var(--mono)', fontWeight: 500 }}>${d.value.toLocaleString()}</td>
                    <td><span className={"tag " + d.tag}>{d.tag}</span></td>
                    <td>
                      <div className="avatars">
                        {d.members.map((m, i) => <div key={i} className="avatar" style={{ width: 22, height: 22, fontSize: 9, background: window.avatarColor(m), color: '#fff', borderColor: 'transparent' }}>{m}</div>)}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
