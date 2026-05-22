/* global React, Icon */
const { useState, useMemo } = React;

function CustomersTable({ rows, onSelect }) {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState({ key: 'mrr', dir: 'desc' });

  const filtered = useMemo(() => {
    let r = rows;
    if (filter !== 'all') r = r.filter(x => x.status === filter);
    if (q) {
      const ql = q.toLowerCase();
      r = r.filter(x => x.name.toLowerCase().includes(ql) || x.company.toLowerCase().includes(ql) || x.email.toLowerCase().includes(ql));
    }
    const { key, dir } = sort;
    r = [...r].sort((a, b) => {
      const av = a[key], bv = b[key];
      if (typeof av === 'number') return dir === 'asc' ? av - bv : bv - av;
      return dir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
    return r;
  }, [rows, q, filter, sort]);

  const toggle = (k) => setSort(s => s.key === k ? { key: k, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key: k, dir: 'desc' });

  return (
    <>
      <div className="filter-bar">
        <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
          <Icon name="search" size={14} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}/>
          <input
            className="search"
            placeholder="Filter customers…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ paddingLeft: 34 }}
          />
        </div>
        {[
          { id: 'all', label: 'All' },
          { id: 'active', label: 'Active' },
          { id: 'trial', label: 'Trial' },
          { id: 'lead', label: 'Lead' },
          { id: 'churn', label: 'Churned' },
        ].map(f => (
          <button key={f.id} className={"chip" + (filter === f.id ? " on" : "")} onClick={() => setFilter(f.id)}>{f.label}</button>
        ))}
        <button className="chip" style={{ marginLeft: 'auto' }}>
          <Icon name="filter" size={12}/> Advanced
        </button>
        <button className="chip">
          <Icon name="download" size={12}/> Export
        </button>
      </div>

      <div className="tbl-wrap">
        <table className="tbl">
          <thead>
            <tr>
              <th onClick={() => toggle('name')}>Customer</th>
              <th onClick={() => toggle('company')}>Company</th>
              <th onClick={() => toggle('plan')}>Plan</th>
              <th onClick={() => toggle('mrr')} style={{ textAlign: 'right' }}>MRR</th>
              <th onClick={() => toggle('status')}>Status</th>
              <th>Owner</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} onClick={() => onSelect(r)}>
                <td>
                  <div className="cust-cell">
                    <div className="avatar">{initials(r.name)}</div>
                    <div>
                      <div className="cust-name">{r.country} {r.name}</div>
                      <div className="cust-mail">{r.email}</div>
                    </div>
                  </div>
                </td>
                <td>{r.company}</td>
                <td><span style={{ fontSize: 12, color: 'var(--text-dim)' }}>{r.plan}</span></td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--mono)', fontWeight: 500 }}>${r.mrr.toLocaleString()}</td>
                <td><span className={"status " + r.status}>{r.status}</span></td>
                <td><div className="avatar" style={{ width: 24, height: 24, fontSize: 10, background: avatarColor(r.owner), color: '#fff', borderColor: 'transparent' }}>{r.owner}</div></td>
                <td><Icon name="chevronRight" size={14} style={{ color: 'var(--text-muted)' }}/></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan="7" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '30px' }}>No results.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function initials(name) {
  return name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
}

// Detail drawer
function CustomerDrawer({ customer, onClose }) {
  return (
    <>
      <div className={"drawer-backdrop" + (customer ? " open" : "")} onClick={onClose}></div>
      <aside className={"drawer" + (customer ? " open" : "")}>
        {customer && (
          <>
            <div className="drawer-head">
              <div className="avatar" style={{ width: 44, height: 44, fontSize: 14 }}>{initials(customer.name)}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }}>{customer.country} {customer.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{customer.email} · {customer.company}</div>
              </div>
              <button className="icon-btn" onClick={onClose} aria-label="Close"><Icon name="close" size={16}/></button>
            </div>
            <div className="drawer-body">
              <div className="drawer-section">
                <h4>Account</h4>
                <div className="field"><span className="k">Plan</span><span className="v">{customer.plan}</span></div>
                <div className="field"><span className="k">MRR</span><span className="v" style={{ fontFamily: 'var(--mono)' }}>${customer.mrr.toLocaleString()}</span></div>
                <div className="field"><span className="k">Status</span><span className="v"><span className={"status " + customer.status}>{customer.status}</span></span></div>
                <div className="field"><span className="k">Joined</span><span className="v">{customer.joined}</span></div>
                <div className="field"><span className="k">Owner</span><span className="v">{customer.owner}</span></div>
              </div>

              <div className="drawer-section">
                <h4>Engagement</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                  {[
                    { lbl: 'Health', val: '82', hint: 'Strong' },
                    { lbl: 'Last seen', val: '2d', hint: 'ago' },
                    { lbl: 'NPS', val: '+44', hint: 'promoter' },
                  ].map(s => (
                    <div key={s.lbl} style={{
                      background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: 10,
                    }}>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.lbl}</div>
                      <div style={{ fontSize: 18, fontWeight: 600, marginTop: 2 }}>{s.val}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-dim)' }}>{s.hint}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="drawer-section">
                <h4>Recent activity</h4>
                <div className="feed">
                  {[
                    { kind: 'success', text: `Renewed annual plan`, time: '3 days ago' },
                    { kind: 'info', text: `Invited 2 teammates`, time: '5 days ago' },
                    { kind: 'info', text: `Opened pricing email`, time: '1 wk ago' },
                  ].map((a, i) => (
                    <div key={i} className="feed-item">
                      <div className={"feed-ic " + a.kind}>
                        <Icon name={a.kind === 'success' ? 'check' : 'mail'} size={11}/>
                      </div>
                      <div className="feed-body">
                        <div className="feed-text">{a.text}</div>
                        <div className="feed-time">{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-primary" style={{ flex: 1 }}><Icon name="mail" size={14}/> Send message</button>
                <button className="btn"><Icon name="phone" size={14}/></button>
                <button className="btn"><Icon name="more" size={14}/></button>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

window.CustomersTable = CustomersTable;
window.CustomerDrawer = CustomerDrawer;
window.initials = initials;
