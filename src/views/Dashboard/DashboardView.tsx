import { useState, useRef } from 'react';
import { Icon } from '@/components/Icon/Icon';
import { Counter, Sparkline, RevenueChart, GrowthChart, DonutChart } from '@/components/Charts';
import { AIInsights } from '@/components/AIInsights/AIInsights';
import { ActivityFeed } from '@/components/AIInsights/ActivityFeed';
import { Pipeline } from '@/components/Pipeline/Pipeline';
import { STAGES, REV_THIS, REV_LAST, MONTHS, FUNNEL, ACTIVITY, HEAT } from '@/data/seed';
import { dispatchNewDeal, dispatchToast } from '@/utils/eventBus';
import type { DealsByStage } from '@/types';
import type { IconName } from '@/types';

interface KpiCardData {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  delta: number;
  dir: 'up' | 'down';
  icon: IconName;
  spark: number[];
  color: string;
}

function KpiCard({ label, value, prefix = '', suffix = '', decimals = 0, delta, dir, icon, spark, color }: KpiCardData) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
        <span className={'delta ' + dir}>
          <Icon name={dir === 'up' ? 'arrowUp' : 'arrowDown'} size={11}/>
          {delta}%
        </span>
        <span className="vs">vs last period</span>
      </div>
      <Sparkline data={spark} color={color}/>
    </div>
  );
}

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function Heatmap({ data }: { data: number[][] }) {
  return (
    <div>
      <div style={{ display: 'flex', gap: 6 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'space-between', paddingTop: 0, fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>
          {DAYS.map((d, i) => <div key={i} style={{ height: 18, display: 'grid', alignItems: 'center' }}>{d}</div>)}
        </div>
        <div style={{ flex: 1 }}>
          <div className="heat">
            {data.flatMap((row, ri) =>
              row.map((v, ci) => (
                <div key={`${ri}-${ci}`} className="heat-cell" style={{ '--v': v } as React.CSSProperties} title={`${DAYS[ri]} ${ci}:00 · ${(v * 100 | 0)}%`}/>
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
        {[0.1, 0.3, 0.5, 0.7, 0.9].map((v, i) => (
          <div key={i} style={{ width: 14, height: 14, borderRadius: 3, background: `rgba(99,102,241,${v * 0.9 + 0.04})` }}/>
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

const RANGES = ['7d', '30d', '90d', '12m'] as const;
const PLAN_SEGMENTS = [
  { value: 6, color: 'var(--text)', label: 'Enterprise' },
  { value: 12, color: 'var(--text-dim)', label: 'Scale' },
  { value: 28, color: 'var(--text-muted)', label: 'Pro' },
  { value: 8, color: 'var(--border-strong)', label: 'Trial' },
];

interface DashboardViewProps {
  push: (msg: string) => void;
  deals: DealsByStage;
  showAI: boolean;
}

export function DashboardView({ push: _push, deals, showAI }: DashboardViewProps) {
  const [range, setRange] = useState<string>('30d');

  const kpis: KpiCardData[] = [
    { label: 'Revenue (MRR)', value: 184230, prefix: '$', delta: 12.4, dir: 'up', icon: 'money', spark: [12, 14, 16, 15, 18, 19, 22, 24, 23, 27, 30, 32], color: 'var(--accent)' },
    { label: 'Active customers', value: 2418, delta: 4.8, dir: 'up', icon: 'users', spark: [22, 24, 23, 26, 28, 29, 31, 34, 33, 36, 38, 41], color: 'var(--text-dim)' },
    { label: 'Conversion rate', value: 3.42, suffix: '%', decimals: 2, delta: 0.6, dir: 'up', icon: 'target', spark: [2.8, 3.0, 2.9, 3.1, 3.2, 3.0, 3.3, 3.4, 3.5, 3.3, 3.4, 3.4], color: 'var(--text-dim)' },
    { label: 'Avg deal size', value: 8420, prefix: '$', delta: 2.1, dir: 'down', icon: 'trend', spark: [8.6, 8.5, 8.7, 8.8, 8.6, 8.5, 8.4, 8.3, 8.4, 8.5, 8.4, 8.4], color: 'var(--text-dim)' },
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
            {RANGES.map(r => (
              <button key={r} className={range === r ? 'on' : ''} onClick={() => setRange(r)}>{r.toUpperCase()}</button>
            ))}
          </div>
          <button className="btn"><Icon name="download" size={13}/> Export</button>
          <button className="btn btn-primary" onClick={dispatchNewDeal}><Icon name="plus" size={13}/> New deal</button>
        </div>
      </div>

      <div className="kpis stagger">
        {kpis.map(k => <KpiCard key={k.label} {...k}/>)}
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
          <RevenueChart data={REV_THIS} prev={REV_LAST} labels={MONTHS}/>
        </div>
        {showAI ? <AIInsights/> : (
          <div className="card">
            <div className="card-head"><div className="card-title">Plan distribution</div></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
              <DonutChart segments={PLAN_SEGMENTS}/>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {PLAN_SEGMENTS.map(s => (
                  <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: s.color }}/>
                    <span style={{ color: 'var(--text-dim)', flex: 1 }}>{s.label}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontWeight: 500 }}>{s.value}</span>
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
            {FUNNEL.map((f, i) => (
              <div key={f.label} className="funnel-row">
                <div className="funnel-label">{f.label}</div>
                <div className="funnel-bar-wrap">
                  <div className="funnel-bar" style={{ width: `${f.pct}%`, animationDelay: `${i * 0.08}s` }}/>
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
          <ActivityFeed items={ACTIVITY}/>
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
          <GrowthChart data={[28, 34, 32, 42, 49, 55, 58, 64, 72, 78, 85, 92]} labels={MONTHS}/>
        </div>
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Team activity</div>
              <div className="card-sub">Avg. deal-touch frequency · UTC</div>
            </div>
          </div>
          <Heatmap data={HEAT}/>
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <div>
            <div className="card-title">Pipeline this week</div>
            <div className="card-sub">Drag deals between stages</div>
          </div>
          <button className="btn" onClick={() => dispatchToast('Stage builder — coming soon')}><Icon name="plus" size={12}/> Stage</button>
        </div>
        <Pipeline deals={deals} stages={STAGES}/>
      </div>
    </>
  );
}

