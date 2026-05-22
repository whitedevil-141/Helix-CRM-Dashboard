import { useState, useEffect, useRef } from 'react';
import { Icon } from '@/components/Icon/Icon';
import type { Page, IconName } from '@/types';

interface PaletteItem {
  kind: string;
  label: string;
  icon: IconName;
  kbd?: string;
  action: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (page: Page) => void;
}

export function CommandPalette({ open, onClose, onNavigate }: CommandPaletteProps) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: PaletteItem[] = [
    { kind: 'Navigate', label: 'Go to Dashboard',   icon: 'dashboard',   kbd: 'G D', action: () => onNavigate('dashboard') },
    { kind: 'Navigate', label: 'Go to Pipeline',    icon: 'pipeline',    kbd: 'G P', action: () => onNavigate('pipeline') },
    { kind: 'Navigate', label: 'Go to Contacts',    icon: 'contacts',    kbd: 'G C', action: () => onNavigate('contacts') },
    { kind: 'Navigate', label: 'Go to Deals',       icon: 'deals',       kbd: 'G L', action: () => onNavigate('deals') },
    { kind: 'Navigate', label: 'Go to Inbox',       icon: 'inbox',       kbd: 'G I', action: () => onNavigate('inbox') },
    { kind: 'Navigate', label: 'Go to Reports',     icon: 'reports',     kbd: 'G R', action: () => onNavigate('reports') },
    { kind: 'Navigate', label: 'Go to Automations', icon: 'automations',             action: () => onNavigate('automations') },
    { kind: 'Navigate', label: 'Go to Calendar',    icon: 'calendar',                action: () => onNavigate('calendar') },
    { kind: 'Navigate', label: 'Go to Team chat',   icon: 'chat',                    action: () => onNavigate('chat') },
    { kind: 'Navigate', label: 'Go to Components',  icon: 'panel',                   action: () => onNavigate('components') },
    { kind: 'Navigate', label: 'Go to Settings',    icon: 'settings',                action: () => onNavigate('settings') },
    { kind: 'Create', label: 'New deal',             icon: 'plus',        kbd: 'N D', action: () => {} },
    { kind: 'Create', label: 'New contact',          icon: 'plus',        kbd: 'N C', action: () => {} },
    { kind: 'Create', label: 'New automation',       icon: 'automations', kbd: 'N A', action: () => {} },
    { kind: 'AI', label: 'Ask Helix to summarize this week', icon: 'sparkles', kbd: '⏎', action: () => {} },
    { kind: 'AI', label: 'Generate weekly digest email',     icon: 'sparkles',          action: () => {} },
    { kind: 'Setting', label: 'Toggle theme',        icon: 'moon',        kbd: '⌘ T', action: () => {} },
    { kind: 'Setting', label: 'Switch workspace',    icon: 'panel',       kbd: '⌘ /', action: () => {} },
  ];

  const filtered = q ? items.filter(i => (i.label + i.kind).toLowerCase().includes(q.toLowerCase())) : items;
  const groups = filtered.reduce<Record<string, PaletteItem[]>>((acc, i) => {
    (acc[i.kind] = acc[i.kind] || []).push(i);
    return acc;
  }, {});

  useEffect(() => {
    if (open) {
      setQ('');
      setSel(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(filtered.length - 1, s + 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setSel(s => Math.max(0, s - 1)); }
      else if (e.key === 'Enter') { e.preventDefault(); filtered[sel]?.action?.(); onClose(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, sel, filtered, onClose]);

  let cursor = -1;
  return (
    <div className={'cmd-backdrop' + (open ? ' open' : '')} onClick={onClose}>
      <div className="cmd" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-input-wrap">
          <Icon name="search" size={17} style={{ color: 'var(--text-muted)' }}/>
          <input ref={inputRef} className="cmd-input" placeholder="Type a command or search…" value={q} onChange={(e) => { setQ(e.target.value); setSel(0); }}/>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', border: '1px solid var(--border)', padding: '2px 6px', borderRadius: 5 }}>esc</span>
        </div>
        <div className="cmd-list">
          {Object.entries(groups).map(([group, list]) => (
            <div key={group}>
              <div className="cmd-section">{group}</div>
              {list.map((it) => {
                cursor++;
                const isSel = cursor === sel;
                const c = cursor;
                return (
                  <div key={it.label} className={'cmd-item' + (isSel ? ' sel' : '')} onClick={() => { it.action(); onClose(); }} onMouseEnter={() => setSel(c)}>
                    <Icon name={it.icon} size={15} style={{ color: 'var(--text-dim)' }}/>
                    <span>{it.label}</span>
                    {it.kbd && <span className="k">{it.kbd}</span>}
                  </div>
                );
              })}
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: '40px 12px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>No matches.</div>
          )}
        </div>
      </div>
    </div>
  );
}
