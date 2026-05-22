/* global React */

const { useMemo, useState, useRef, useEffect } = React;

// ---------- Animated counter ----------
function useAnimatedNumber(target, ms = 900) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const from = 0;
    const easing = (t) => 1 - Math.pow(1 - t, 3);
    const step = (now) => {
      const t = Math.min(1, (now - start) / ms);
      setV(from + (target - from) * easing(t));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

function Counter({ to, prefix = '', suffix = '', decimals = 0 }) {
  const v = useAnimatedNumber(to, 1100);
  const formatted = v.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return <>{prefix}{formatted}{suffix}</>;
}

// ---------- Sparkline ----------
function Sparkline({ data, width = 92, height = 28, color = "var(--accent)", fill = true }) {
  const max = Math.max(...data); const min = Math.min(...data);
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

// ---------- Big revenue chart ----------
function RevenueChart({ data, prev, labels }) {
  const wrapRef = useRef(null);
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
  const yOf = (v) => padT + innerH - ((v - min) / (max - min)) * innerH;

  const linePath = (arr) => arr.map((d, i) => (i === 0 ? `M${xs[i]},${yOf(d)}` : `L${xs[i]},${yOf(d)}`)).join(' ');
  const areaPath = (arr) => linePath(arr) + ` L${xs[xs.length-1]},${padT+innerH} L${xs[0]},${padT+innerH} Z`;

  const [hover, setHover] = useState(null);
  const onMove = (e) => {
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

        {/* y-axis grid + labels */}
        {tickVals.map((tv, i) => (
          <g key={i}>
            <line x1={padL} x2={W - padR} y1={yOf(tv)} y2={yOf(tv)} stroke="var(--border)" strokeDasharray="2 4"/>
            <text x={padL - 8} y={yOf(tv)} fill="var(--text-muted)" fontSize="10" textAnchor="end" alignmentBaseline="middle" fontFamily="var(--mono)">
              {tv >= 1000 ? `$${(tv/1000).toFixed(0)}k` : `$${tv.toFixed(0)}k`}
            </text>
          </g>
        ))}

        {/* prev period line (dashed) */}
        <path d={linePath(prev)} fill="none" stroke="var(--text-muted)" strokeWidth="1.4" strokeDasharray="4 4" opacity="0.55"/>

        {/* current period area + line */}
        <path d={areaPath(data)} fill="url(#revFill)"/>
        <path d={linePath(data)} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

        {/* x-axis labels */}
        {labels.map((l, i) => (
          <text key={i} x={xs[i]} y={H - 8} fill="var(--text-muted)" fontSize="10" textAnchor="middle" fontFamily="var(--mono)">{l}</text>
        ))}

        {/* hover */}
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

// ---------- Growth: animated bars ----------
function GrowthChart({ data, labels }) {
  const wrapRef = useRef(null);
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
      <style>{`@keyframes bar-grow { from { transform: scaleY(0); transform-origin: bottom; } to { transform: scaleY(1); } } svg rect { transform-origin: bottom; transform-box: fill-box; }`}</style>
    </div>
  );
}

// ---------- Donut for plan distribution ----------
function DonutChart({ segments, size = 160 }) {
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
      <div style={{
        position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center'
      }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>{total}</div>
          <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>customers</div>
        </div>
      </div>
    </div>
  );
}

window.Counter = Counter;
window.Sparkline = Sparkline;
window.RevenueChart = RevenueChart;
window.GrowthChart = GrowthChart;
window.DonutChart = DonutChart;
