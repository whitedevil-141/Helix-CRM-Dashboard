/* global React, Icon */
const { useState: useS3 } = React;

/* =========================================================
   COMPONENTS — design system showcase
   ========================================================= */
function ComponentsView() {
  const sections = [
    { id: 'buttons', label: 'Buttons' },
    { id: 'inputs', label: 'Inputs' },
    { id: 'controls', label: 'Controls' },
    { id: 'badges', label: 'Badges & tags' },
    { id: 'avatars', label: 'Avatars' },
    { id: 'cards', label: 'Cards' },
    { id: 'data', label: 'Data viz' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'overlays', label: 'Overlays' },
    { id: 'tables', label: 'Tables' },
    { id: 'empty', label: 'Empty states' },
    { id: 'typography', label: 'Typography' },
  ];

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Components</h1>
          <div className="sub">Helix design system · copy these patterns when building new pages.</div>
        </div>
        <div className="right">
          <button className="btn"><Icon name="download" size={13}/> Download Figma kit</button>
        </div>
      </div>

      <div className="settings-shell">
        <aside className="settings-tabs sticky">
          {sections.map(s => (
            <a key={s.id} href={`#cmp-${s.id}`} className="settings-tab">{s.label}</a>
          ))}
        </aside>
        <div className="settings-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <CmpSection id="buttons" title="Buttons" desc="Primary uses solid foreground. Secondary, tertiary, and ghost reduce in emphasis.">
            <div className="cmp-row">
              <button className="btn btn-primary">Primary</button>
              <button className="btn">Secondary</button>
              <button className="btn" style={{ background: 'transparent', border: '1px solid transparent' }}>Ghost</button>
              <button className="btn btn-primary"><Icon name="plus" size={13}/> With icon</button>
              <button className="btn" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>Disabled</button>
            </div>
            <div className="cmp-row">
              <button className="btn btn-primary" style={{ padding: '5px 10px', fontSize: 12 }}>Small</button>
              <button className="btn btn-primary">Medium</button>
              <button className="btn btn-primary" style={{ padding: '11px 18px', fontSize: 14 }}>Large</button>
            </div>
            <div className="cmp-row">
              <button className="icon-btn"><Icon name="bell" size={16}/></button>
              <button className="icon-btn"><Icon name="search" size={16}/></button>
              <button className="icon-btn"><Icon name="settings" size={16}/></button>
              <button className="icon-btn"><Icon name="more" size={16}/></button>
            </div>
            <div className="cmp-row">
              <div className="seg">
                <button className="on">Day</button><button>Week</button><button>Month</button>
              </div>
              <div className="seg">
                <button>Grid</button><button className="on">List</button>
              </div>
            </div>
          </CmpSection>

          <CmpSection id="inputs" title="Inputs" desc="Text inputs share the .search class. Pair with leading icon for context.">
            <div className="cmp-row">
              <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
                <Icon name="search" size={14} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}/>
                <input className="search" placeholder="Search…" style={{ paddingLeft: 34 }}/>
              </div>
              <input className="search" placeholder="Default input" style={{ maxWidth: 220 }}/>
            </div>
            <div className="cmp-row">
              <select className="search" style={{ maxWidth: 200 }}>
                <option>Select…</option>
                <option>Option A</option>
                <option>Option B</option>
              </select>
              <input className="search" type="date" defaultValue="2026-05-20" style={{ maxWidth: 180 }}/>
              <textarea className="search" placeholder="Textarea" style={{ maxWidth: 280, minHeight: 70 }}/>
            </div>
          </CmpSection>

          <CmpSection id="controls" title="Toggles, sliders & checkboxes">
            <div className="cmp-row">
              <ToggleDemo/>
              <ToggleDemo initial/>
            </div>
            <div className="cmp-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                <input type="checkbox" defaultChecked/> Email me weekly digest
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                <input type="radio" name="cmp-r" defaultChecked/> Default
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                <input type="radio" name="cmp-r"/> Alternate
              </label>
            </div>
          </CmpSection>

          <CmpSection id="badges" title="Badges, tags & status">
            <div className="cmp-row">
              <span className="status active">active</span>
              <span className="status lead">lead</span>
              <span className="status trial">trial</span>
              <span className="status churn">churned</span>
            </div>
            <div className="cmp-row">
              <span className="tag">default</span>
              <span className="tag hot">hot</span>
              <span className="tag warm">warm</span>
              <span className="tag cold">cold</span>
            </div>
            <div className="cmp-row">
              <span className="chip">filter chip</span>
              <span className="chip on">selected</span>
              <span className="chip"><Icon name="filter" size={11}/> with icon</span>
            </div>
            <div className="cmp-row">
              <span className="delta up"><Icon name="arrowUp" size={11}/> 12.4%</span>
              <span className="delta down"><Icon name="arrowDown" size={11}/> 2.1%</span>
            </div>
          </CmpSection>

          <CmpSection id="avatars" title="Avatars">
            <div className="cmp-row" style={{ alignItems: 'center' }}>
              <div className="avatar" style={{ width: 20, height: 20, fontSize: 9 }}>MO</div>
              <div className="avatar" style={{ background: '#475569', color: '#fff', borderColor: 'transparent' }}>MO</div>
              <div className="avatar online" style={{ background: '#475569', color: '#fff', borderColor: 'transparent' }}>MO</div>
              <div className="avatar" style={{ width: 36, height: 36, fontSize: 13 }}>MO</div>
              <div className="avatar" style={{ width: 44, height: 44, fontSize: 14, background: '#475569', color: '#fff', borderColor: 'transparent' }}>MO</div>
            </div>
            <div className="cmp-row" style={{ alignItems: 'center' }}>
              <div className="avatars">
                {['AR','MO','SK','DV'].map((m, i) => (
                  <div key={i} className="avatar" style={{ background: '#475569', color: '#fff', borderColor: 'transparent', width: 26, height: 26, fontSize: 10 }}>{m}</div>
                ))}
                <div className="avatar" style={{ width: 26, height: 26, fontSize: 10 }}>+3</div>
              </div>
            </div>
          </CmpSection>

          <CmpSection id="cards" title="Cards">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              <div className="card">
                <div className="card-title">Default card</div>
                <div className="card-sub" style={{ marginTop: 4 }}>Subtle 1px border, no shadow in dark mode.</div>
              </div>
              <div className="kpi">
                <div className="kpi-top">
                  <div className="kpi-label">KPI tile</div>
                  <div className="kpi-ic"><Icon name="money" size={15}/></div>
                </div>
                <div className="kpi-val">$184.2k</div>
                <div className="kpi-foot">
                  <span className="delta up"><Icon name="arrowUp" size={11}/>12.4%</span>
                  <span className="vs">vs last month</span>
                </div>
              </div>
              <div className="ai-card">
                <div className="ai-head">
                  <div className="ai-orb"><Icon name="sparkles" size={12} style={{ color: 'var(--bg)' }}/></div>
                  <div><div className="ai-title">AI card</div><div className="ai-status"><span className="live-dot"/> live</div></div>
                </div>
                <p style={{ margin: 0, fontSize: 12.5, color: 'var(--text-dim)' }}>Surface intelligent suggestions in this format.</p>
              </div>
            </div>
          </CmpSection>

          <CmpSection id="data" title="Data viz primitives" desc="Built with inline SVG — no chart library.">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              <div className="card">
                <div className="card-title">Sparkline</div>
                <div style={{ position: 'relative', height: 40, marginTop: 10 }}>
                  {React.createElement(window.Sparkline, { data: [12,14,16,15,18,19,22,24,23,27,30,32], width: 240, height: 36, color: 'var(--accent)' })}
                </div>
              </div>
              <div className="card">
                <div className="card-title">Progress bar</div>
                <div style={{ height: 4, background: 'var(--card-hover)', borderRadius: 100, marginTop: 14, overflow: 'hidden' }}>
                  <div style={{ width: '64%', height: '100%', background: 'var(--text)', opacity: 0.75, borderRadius: 100 }}/>
                </div>
                <div style={{ marginTop: 8, fontSize: 12, color: 'var(--text-dim)' }}>64% complete</div>
              </div>
              <div className="card">
                <div className="card-title">Donut</div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 6 }}>
                  {React.createElement(window.DonutChart, { size: 120, segments: [
                    { value: 6, color: 'var(--text)' },
                    { value: 12, color: 'var(--text-dim)' },
                    { value: 28, color: 'var(--text-muted)' },
                  ] })}
                </div>
              </div>
              <div className="card">
                <div className="card-title">Bars</div>
                <div style={{ marginTop: 6 }}>
                  {React.createElement(window.GrowthChart, { data: [28,34,32,42,49,55,58,64], labels: ['M','T','W','T','F','S','S','M'] })}
                </div>
              </div>
            </div>
          </CmpSection>

          <CmpSection id="feedback" title="Toasts, banners, skeleton">
            <div className="cmp-row" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
              <div className="toast" style={{ position: 'static' }}>
                <div className="t-ic"><Icon name="check" size={13} style={{ color: 'var(--bg)' }}/></div>
                <span>Saved · 2 changes synced.</span>
              </div>
              <div className="banner banner-info">
                <Icon name="sparkles" size={14}/>
                <span>This is an informational banner — use sparingly.</span>
                <button className="icon-btn" style={{ width: 22, height: 22, marginLeft: 'auto' }}><Icon name="close" size={12}/></button>
              </div>
              <div className="banner banner-warn">
                <Icon name="flame" size={14}/>
                <span>3 high-value accounts haven't been contacted in 14+ days.</span>
              </div>
            </div>
            <div className="cmp-row" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
              <div className="card">
                <div className="card-title">Skeleton loader</div>
                <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div className="skel" style={{ width: '60%', height: 14 }}/>
                  <div className="skel" style={{ width: '100%', height: 10 }}/>
                  <div className="skel" style={{ width: '90%', height: 10 }}/>
                  <div className="skel" style={{ width: '40%', height: 10 }}/>
                </div>
              </div>
            </div>
          </CmpSection>

          <CmpSection id="overlays" title="Overlays" desc="Drawer, modal, command palette, dropdown — open the live ones from the demo buttons.">
            <DemoOverlays/>
          </CmpSection>

          <CmpSection id="tables" title="Tables">
            <div className="card" style={{ padding: 0 }}>
              <div className="tbl-wrap">
                <table className="tbl">
                  <thead><tr><th>Header</th><th>Sortable</th><th>Status</th><th style={{ textAlign: 'right' }}>Numeric</th></tr></thead>
                  <tbody>
                    <tr><td><div className="cust-name">Row label</div></td><td>—</td><td><span className="status active">active</span></td><td style={{ textAlign: 'right', fontFamily: 'var(--mono)' }}>$12,481</td></tr>
                    <tr><td><div className="cust-name">Another row</div></td><td>—</td><td><span className="status trial">trial</span></td><td style={{ textAlign: 'right', fontFamily: 'var(--mono)' }}>$4,200</td></tr>
                    <tr><td><div className="cust-name">Third row</div></td><td>—</td><td><span className="status churn">churned</span></td><td style={{ textAlign: 'right', fontFamily: 'var(--mono)' }}>$0</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CmpSection>

          <CmpSection id="empty" title="Empty states">
            <div className="card" style={{ display: 'grid', placeItems: 'center', padding: 50, textAlign: 'center', minHeight: 240 }}>
              <div>
                <div style={{ width: 48, height: 48, margin: '0 auto 14px', borderRadius: 10, background: 'var(--card-hover)', display: 'grid', placeItems: 'center' }}>
                  <Icon name="inbox" size={20} style={{ color: 'var(--text-dim)' }}/>
                </div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>No messages yet</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-dim)', marginTop: 4, maxWidth: 320 }}>When a contact emails you back, it'll show up here.</div>
                <button className="btn btn-primary" style={{ marginTop: 14 }}>Compose first message</button>
              </div>
            </div>
          </CmpSection>

          <CmpSection id="typography" title="Typography">
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <div style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.03em' }}>Display · 36 / 600</div>
                <div className="setting-hint">For hero numbers and rare page heroes.</div>
              </div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.025em' }}>H1 · 28 / 600</div>
                <div className="setting-hint">Page titles.</div>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.015em' }}>H2 · 18 / 600</div>
                <div className="setting-hint">Section headers in detail views.</div>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>H3 / card title · 15 / 600</div>
                <div className="setting-hint">Cards and panels.</div>
              </div>
              <div>
                <div style={{ fontSize: 13 }}>Body · 13 / 400 · Default reading size for tables and dense content.</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>Eyebrow · 11 / 500 / uppercase</div>
              </div>
              <div>
                <div style={{ fontSize: 13, fontFamily: 'var(--mono)' }}>Mono · JetBrains Mono · $12,481.00 · for numbers, ids, code.</div>
              </div>
            </div>
          </CmpSection>
        </div>
      </div>
    </>
  );
}

function CmpSection({ id, title, desc, children }) {
  return (
    <section id={`cmp-${id}`} className="cmp-section">
      <div className="cmp-section-h">
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, letterSpacing: '-0.015em' }}>{title}</h2>
        {desc && <div className="setting-hint">{desc}</div>}
      </div>
      <div className="cmp-section-body">{children}</div>
    </section>
  );
}

function ToggleDemo({ initial = false }) {
  const [on, setOn] = useS3(initial);
  return (
    <button className={"flow-toggle" + (on ? ' on' : '')} onClick={() => setOn(o => !o)} role="switch" aria-checked={on}>
      <i/>
    </button>
  );
}

function DemoOverlays() {
  const [modal, setModal] = useS3(false);
  return (
    <>
      <div className="cmp-row">
        <button className="btn" onClick={() => setModal(true)}>Open modal</button>
        <button className="btn" onClick={() => window.dispatchEvent(new CustomEvent('helix:openpalette'))}>Open command palette</button>
      </div>
      <div className={"cmd-backdrop" + (modal ? " open" : "")} onClick={() => setModal(false)}>
        <div className="cmp-modal" onClick={(e) => e.stopPropagation()}>
          <div style={{ padding: 22, borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }}>Confirm action</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-dim)', marginTop: 2 }}>This is a sample modal layout you can re-use.</div>
            </div>
            <button className="icon-btn" onClick={() => setModal(false)}><Icon name="close" size={15}/></button>
          </div>
          <div style={{ padding: 22, fontSize: 13.5, color: 'var(--text-dim)' }}>
            Modals are used for destructive confirmations, multi-step creation, or any action that must be acknowledged before continuing. Keep them short.
          </div>
          <div style={{ padding: 16, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button className="btn" onClick={() => setModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={() => setModal(false)}>Continue</button>
          </div>
        </div>
      </div>
    </>
  );
}

window.ComponentsView = ComponentsView;
