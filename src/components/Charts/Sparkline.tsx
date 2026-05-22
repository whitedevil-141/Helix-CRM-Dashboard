import { useMemo } from 'react';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fill?: boolean;
}

export function Sparkline({ data, width = 92, height = 28, color = 'var(--accent)', fill = true }: SparklineProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = Math.max(1, max - min);
  const step = width / (data.length - 1);
  const pts = data.map((d, i) => [i * step, height - ((d - min) / range) * (height - 4) - 2]);
  const path = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
  const area = `${path} L${width},${height} L0,${height} Z`;
  const gid = useMemo(() => 'sg' + Math.random().toString(36).slice(2, 8), []);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="spark" style={{ position: 'relative', overflow: 'visible' }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      {fill && <path d={area} fill={`url(#${gid})`} />}
      <path d={path} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="2.4" fill={color}/>
    </svg>
  );
}
