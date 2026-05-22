import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import type { TweakValues } from '@/types';

export function useTweaks(defaults: TweakValues): [TweakValues, (keyOrEdits: string | Partial<TweakValues>, val?: any) => void] {
  const [values, setValues] = useState(defaults);

  const setTweak = useCallback((keyOrEdits: string | Partial<TweakValues>, val?: any) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null
      ? keyOrEdits : { [keyOrEdits]: val };
    setValues((prev) => ({ ...prev, ...edits }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
    window.dispatchEvent(new CustomEvent('tweakchange', { detail: edits }));
  }, []);

  return [values, setTweak];
}

export function useTweaksPanel(_defaults: TweakValues) {
  const [open, setOpen] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

  const hasDeckStage = useMemo(
    () => typeof document !== 'undefined' && !!document.querySelector('deck-stage'),
    [],
  );

  const [railEnabled, setRailEnabled] = useState(
    () => hasDeckStage && !!(document.querySelector('deck-stage') as any)?._railEnabled,
  );

  useEffect(() => {
    if (!hasDeckStage || railEnabled) return;
    const onMsg = (e: MessageEvent) => {
      if (e.data && e.data.type === '__omelette_rail_enabled') setRailEnabled(true);
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [hasDeckStage, railEnabled]);

  const [railVisible, setRailVisible] = useState(() => {
    try { return localStorage.getItem('deck-stage.railVisible') !== '0'; } catch (e) { return true; }
  });

  const toggleRail = (on: boolean) => {
    setRailVisible(on);
    window.postMessage({ type: '__deck_rail_visible', on }, '*');
  };

  const offsetRef = useRef({ x: 16, y: 16 });
  const PAD = 16;

  const clampToViewport = useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth, h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y)),
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);

  useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);
      else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  return {
    open,
    setOpen,
    dragRef,
    railVisible,
    toggleRail,
    hasDeckStage,
  };
}
