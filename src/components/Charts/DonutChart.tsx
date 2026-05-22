interface DonutSegment {
  value: number;
  color: string;
  label?: string;
}

interface DonutChartProps {
  segments: DonutSegment[];
  size?: number;
}

export function DonutChart({ segments, size = 160 }: DonutChartProps) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  let offset = 0;
  const r = size / 2 - 14;
  const c = size / 2;
  const C = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={c} cy={c} r={r} fill="none" stroke="var(--card-hover)" strokeWidth="14"/>
        {segments.map((s, i) => {
          const len = (s.value / total) * C;
          const el = (
            <circle key={i} cx={c} cy={c} r={r} fill="none" stroke={s.color} strokeWidth="14"
              strokeDasharray={`${len} ${C}`} strokeDashoffset={-offset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 1s ease' }}
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>{total}</div>
          <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>customers</div>
        </div>
      </div>
    </div>
  );
}
