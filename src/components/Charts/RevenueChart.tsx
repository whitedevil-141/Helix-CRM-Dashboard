import { useRef, useState, useEffect } from 'react';

interface RevenueChartProps {
  data: number[];
  prev: number[];
  labels: string[];
}

export function RevenueChart({ data, prev, labels }: RevenueChartProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [W, setW] = useState(600);
  const H = 240;
  const padL = 40, padR = 10, padT = 20, padB = 28;

  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setW(Math.max(320, e.contentRect.width));
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const max = Math.max(...data, ...prev) * 1.12;
  const min = 0;
  const xs = data.map((_, i) => padL + (i / (data.length - 1)) * innerW);
  const yOf = (v: number) => padT + innerH - ((v - min) / (max - min)) * innerH;

  const linePath = (arr: number[]) => arr.map((d, i) => (i === 0 ? `M${xs[i]},${yOf(d)}` : `L${xs[i]},${yOf(d)}`)).join(' ');
  const areaPath = (arr: number[]) => linePath(arr) + ` L${xs[xs.length-1]},${padT+innerH} L${xs[0]},${padT+innerH} Z`;

  const [hover, setHover] = useState<number | null>(null);
  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < padL || x > padL + innerW) { setHover(null); return; }
    const i = Math.round(((x - padL) / innerW) * (data.length - 1));
    setHover(Math.max(0, Math.min(data.length - 1, i)));
  };

  const ticks = 4;
  const tickVals = Array.from({ length: ticks + 1 }, (_, i) => (max / ticks) * i);

  return (
    <div ref={wrapRef} className="chart-wrap">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
        <defs>
          <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.16"/>
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
          </linearGradient>
        </defs>

        {tickVals.map((tv, i) => (
          <g key={i}>
            <line x1={padL} x2={W - padR} y1={yOf(tv)} y2={yOf(tv)} stroke="var(--border)" strokeDasharray="2 4"/>
            <text x={padL - 8} y={yOf(tv)} fill="var(--text-muted)" fontSize="10" textAnchor="end" alignmentBaseline="middle" fontFamily="var(--mono)">
              {tv >= 1000 ? `$${(tv/1000).toFixed(0)}k` : `$${tv.toFixed(0)}k`}
            </text>
          </g>
        ))}

        <path d={linePath(prev)} fill="none" stroke="var(--text-muted)" strokeWidth="1.4" strokeDasharray="4 4" opacity="0.55"/>
        <path d={areaPath(data)} fill="url(#revFill)"/>
        <path d={linePath(data)} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

        {labels.map((l, i) => (
          <text key={i} x={xs[i]} y={H - 8} fill="var(--text-muted)" fontSize="10" textAnchor="middle" fontFamily="var(--mono)">{l}</text>
        ))}

        {hover !== null && (
          <g>
            <line x1={xs[hover]} x2={xs[hover]} y1={padT} y2={padT + innerH} stroke="var(--border-strong)"/>
            <circle cx={xs[hover]} cy={yOf(data[hover])} r="4.5" fill="var(--bg-elev)" stroke="var(--accent)" strokeWidth="2"/>
          </g>
        )}
      </svg>
      {hover !== null && (
        <div style={{
          position: 'absolute',
          left: Math.min(W - 140, Math.max(0, xs[hover] - 60)),
          top: 4,
          background: 'var(--bg-elev)',
          border: '1px solid var(--border-strong)',
          borderRadius: 10,
          padding: '8px 12px',
          boxShadow: 'var(--shadow-md)',
          fontSize: 12,
          pointerEvents: 'none',
        }}>
          <div style={{ color: 'var(--text-muted)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{labels[hover]}</div>
          <div style={{ fontWeight: 600, fontSize: 14, marginTop: 2 }}>${data[hover]}k</div>
          <div style={{ color: 'var(--text-dim)', fontSize: 11 }}>vs ${prev[hover]}k last yr</div>
        </div>
      )}
    </div>
  );
}
