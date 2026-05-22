import { Icon } from '@/components/Icon/Icon';
import { dispatchNewAutomation } from '@/utils/eventBus';

interface AutoItem {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'draft';
  trigger: string;
  actions: string[];
  runs: number;
  lastRun: string;
}

const AUTOS: AutoItem[] = [
  { id: 'a1', name: 'New trial → onboarding sequence', status: 'active', trigger: 'Signup created', actions: ['Send welcome', 'Schedule call', 'Create task'], runs: 1284, lastRun: '12s ago' },
  { id: 'a2', name: 'High-intent lead → SDR assignment', status: 'active', trigger: 'Pricing page visit', actions: ['Score lead', 'Assign owner', 'Slack alert'], runs: 612, lastRun: '3m ago' },
  { id: 'a3', name: 'Churn risk → CSM playbook', status: 'active', trigger: 'Usage drop > 30%', actions: ['Create ticket', 'Notify CSM', 'Schedule QBR'], runs: 92, lastRun: '1h ago' },
  { id: 'a4', name: 'Stalled deal → re-engagement', status: 'paused', trigger: 'No activity 14d', actions: ['Send check-in', 'Bump task'], runs: 348, lastRun: 'yesterday' },
  { id: 'a5', name: 'Closed-won → handoff', status: 'active', trigger: 'Deal moved to Won', actions: ['Create CSM task', 'Send celebration', 'Update CRM'], runs: 47, lastRun: '4h ago' },
  { id: 'a6', name: 'Trial expiring → conversion offer', status: 'draft', trigger: 'Trial ends in 3d', actions: ['Send offer email', 'Notify rep'], runs: 0, lastRun: '—' },
];

const KPI_ITEMS = [
  { lbl: 'Active workflows', val: '4' },
  { lbl: 'Runs this month', val: '2,383' },
  { lbl: 'Success rate', val: '98.7%' },
  { lbl: 'Hours saved', val: '184' },
];

function statusClass(status: AutoItem['status']): string {
  if (status === 'active') return 'active';
  if (status === 'paused') return 'trial';
  return 'lead';
}

export function AutomationsView() {
  const activeCount = AUTOS.filter(a => a.status === 'active').length;
  const totalRuns = AUTOS.reduce((s, a) => s + a.runs, 0);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Automations</h1>
          <div className="sub">{activeCount} active · {totalRuns.toLocaleString()} runs this month</div>
        </div>
        <div className="right">
          <button className="btn"><Icon name="filter" size={13}/> Filter</button>
          <button className="btn btn-primary" onClick={dispatchNewAutomation}><Icon name="plus" size={13}/> New automation</button>
        </div>
      </div>

      <div className="kpis stagger">
        {KPI_ITEMS.map(k => (
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
              <button className={'flow-toggle' + (a.status === 'active' ? ' on' : '')} aria-label="Toggle"><i/></button>
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
              <span className={'status ' + statusClass(a.status)}>{a.status}</span>
              <button className="icon-btn"><Icon name="more" size={14}/></button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
