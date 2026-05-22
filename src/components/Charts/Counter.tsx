import { useState, useEffect } from 'react';

function useAnimatedNumber(target: number, ms = 900): number {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const from = 0;
    const easing = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      setV(from + (target - from) * easing(t));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

interface CounterProps {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function Counter({ to, prefix = '', suffix = '', decimals = 0 }: CounterProps) {
  const v = useAnimatedNumber(to, 1100);
  const formatted = v.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return <>{prefix}{formatted}{suffix}</>;
}
