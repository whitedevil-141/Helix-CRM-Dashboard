import { useRef, useState, useEffect } from 'react';

interface GrowthChartProps {
  data: number[];
  labels: string[];
}

export function GrowthChart({ data, labels }: GrowthChartProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [W, setW] = useState(400);
  const H = 220;
  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setW(Math.max(200, e.contentRect.width));
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);
  const padL = 30, padR = 6, padT = 14, padB = 24;
  const max = Math.max(...data) * 1.1;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const gap = 4;
  const bw = (innerW - gap * (data.length - 1)) / data.length;
  return (
    <div ref={wrapRef} className="chart-wrap" style={{ height: H }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {[0, 0.5, 1].map((p, i) => (
          <line key={i} x1={padL} x2={W-padR} y1={padT + innerH * (1-p)} y2={padT + innerH * (1-p)} stroke="var(--border)" strokeDasharray="2 4"/>
        ))}
        {data.map((d, i) => {
          const h = (d / max) * innerH;
          const x = padL + i * (bw + gap);
          const y = padT + innerH - h;
          return (
            <g key={i}>
              <rect x={x} y={y} width={bw} height={h} rx="2" fill="var(--accent)" opacity="0.85" style={{ animation: `bar-grow 0.7s ${i * 0.06}s both` }}/>
            </g>
          );
        })}
        {labels.map((l, i) => (
          <text key={i} x={padL + i * (bw + gap) + bw/2} y={H - 8} fill="var(--text-muted)" fontSize="10" textAnchor="middle" fontFamily="var(--mono)">{l}</text>
        ))}
      </svg>
    </div>
  );
}
