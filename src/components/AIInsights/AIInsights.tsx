import { useState, useEffect } from 'react';
import { Icon } from '@/components/Icon/Icon';

const INSIGHTS = [
  { headline: 'Pipeline is up 12.4% week-over-week, driven by Enterprise deals.', action: 'View deals', hl: '12.4%' },
  { headline: "3 high-value accounts haven't been contacted in 14+ days.", action: 'Open list', hl: '3 high-value accounts' },
  { headline: 'Vertex Health is showing churn signals: usage down 38% MTD.', action: 'Create play', hl: 'Vertex Health' },
  { headline: 'Win-rate jumped to 31% on deals where pricing demo happens within 5 days.', action: 'See pattern', hl: '31%' },
];

export function AIInsights() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % INSIGHTS.length), 6000);
    return () => clearInterval(t);
  }, []);
  const cur = INSIGHTS[idx];
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

      <div style={{ display: 'flex', gap: 4, marginTop: 14, alignItems: 'center', justifyContent: 'center' }}>
        {INSIGHTS.map((_, i) => (
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
