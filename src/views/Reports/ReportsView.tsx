import { Icon } from '@/components/Icon/Icon';
import { RevenueChart, Sparkline } from '@/components/Charts';
import { REV_THIS, REV_LAST, MONTHS } from '@/data/seed';
import { dispatchToast } from '@/utils/eventBus';

interface ReportItem {
  id: string;
  name: string;
  kind: string;
  cadence: string;
  owner: string;
  val: string;
  delta: string;
  dir: 'up' | 'down';
  spark: number[];
}

const REPORTS: ReportItem[] = [
  { id: 'r1', name: 'Weekly revenue summary', kind: 'Financial', cadence: 'Weekly · Mon 9am', owner: 'AR', val: '$184,230', delta: '+12.4%', dir: 'up', spark: [12,14,15,18,19,22,24,23,27,30,32,34] },
  { id: 'r2', name: 'Pipeline health by stage', kind: 'Sales', cadence: 'Daily', owner: 'MO', val: '$1.24M', delta: '+8.1%', dir: 'up', spark: [82,84,86,88,90,93,98,102,108,112,118,124] },
  { id: 'r3', name: 'Win-rate by source', kind: 'Sales', cadence: 'Monthly', owner: 'SK', val: '31.2%', delta: '+2.4%', dir: 'up', spark: [22,24,26,25,27,28,29,30,30,31,31,31] },
  { id: 'r4', name: 'Churn — at-risk accounts', kind: 'Customer', cadence: 'Real-time', owner: 'DV', val: '4 accounts', delta: '+1', dir: 'down', spark: [2,2,2,3,3,3,4,4,4,4,4,4] },
  { id: 'r5', name: 'Sales cycle length', kind: 'Sales', cadence: 'Monthly', owner: 'AR', val: '32 days', delta: '-4 days', dir: 'up', spark: [40,39,38,37,36,36,35,34,33,33,32,32] },
  { id: 'r6', name: 'Activation conversion', kind: 'Product', cadence: 'Daily', owner: 'MO', val: '12.8%', delta: '-0.6%', dir: 'down', spark: [14,14,13,13,13,13,13,12,12,12,12,12] },
];

const TOP_PERFORMERS = [
  { name: 'Amelia Rouse', initials: 'AR', val: '$412k', deals: 14, pct: 100 },
  { name: 'Mira Okafor',  initials: 'MO', val: '$348k', deals: 11, pct: 84 },
  { name: 'Sun-Ho Kim',   initials: 'SK', val: '$222k', deals: 9,  pct: 54 },
  { name: 'Devin Vega',   initials: 'DV', val: '$184k', deals: 7,  pct: 45 },
];

export function ReportsView() {
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
          <button className="btn btn-primary" onClick={() => dispatchToast('Report builder — coming soon')}><Icon name="plus" size={13}/> New report</button>
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
          <RevenueChart data={REV_THIS} prev={REV_LAST} labels={MONTHS}/>
        </div>
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Top performers</div>
              <div className="card-sub">By closed-won, this quarter</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {TOP_PERFORMERS.map(p => (
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
              <span className={'delta ' + r.dir}>
                <Icon name={r.dir === 'up' ? 'arrowUp' : 'arrowDown'} size={11}/>{r.delta}
              </span>
            </div>
            <Sparkline data={r.spark} width={220} height={36} color="var(--accent)"/>
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
