import type { IconName } from '@/types';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Icon({ name, size = 18, className = '', style }: IconProps) {
  const s = { width: size, height: size, ...style };
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const paths: Record<IconName, React.ReactNode> = {
    dashboard: <><rect x="3" y="3" width="7" height="9" rx="1.5" {...p}/><rect x="14" y="3" width="7" height="5" rx="1.5" {...p}/><rect x="14" y="12" width="7" height="9" rx="1.5" {...p}/><rect x="3" y="16" width="7" height="5" rx="1.5" {...p}/></>,
    contacts: <><circle cx="9" cy="8" r="3.2" {...p}/><path d="M3 20c1-3.5 3.5-5 6-5s5 1.5 6 5" {...p}/><circle cx="17" cy="7" r="2.4" {...p}/><path d="M15.5 13.5c2 0 4.5 1 5.5 4" {...p}/></>,
    deals: <><path d="M3 7l9-4 9 4-9 4-9-4z" {...p}/><path d="M3 12l9 4 9-4" {...p}/><path d="M3 17l9 4 9-4" {...p}/></>,
    pipeline: <><rect x="3" y="4" width="4" height="16" rx="1" {...p}/><rect x="10" y="4" width="4" height="11" rx="1" {...p}/><rect x="17" y="4" width="4" height="7" rx="1" {...p}/></>,
    inbox: <><path d="M3 13l3-8.5A2 2 0 0 1 7.9 3h8.2a2 2 0 0 1 1.9 1.5L21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6z" {...p}/><path d="M3 13h5l1.5 2h5L16 13h5" {...p}/></>,
    automations: <><path d="M12 2v4" {...p}/><path d="M12 18v4" {...p}/><path d="M4.93 4.93l2.83 2.83" {...p}/><path d="M16.24 16.24l2.83 2.83" {...p}/><path d="M2 12h4" {...p}/><path d="M18 12h4" {...p}/><circle cx="12" cy="12" r="4" {...p}/></>,
    reports: <><path d="M4 19V5" {...p}/><path d="M4 19h16" {...p}/><path d="M8 16l4-5 3 3 5-7" {...p}/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" {...p}/><path d="M3 9h18M8 3v4M16 3v4" {...p}/></>,
    chat: <><path d="M21 15a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" {...p}/></>,
    settings: <><circle cx="12" cy="12" r="3" {...p}/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h.05a1.7 1.7 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.7 1.7 0 0 0 1 1.51 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.05a1.7 1.7 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1z" {...p}/></>,
    search: <><circle cx="11" cy="11" r="7" {...p}/><path d="m20 20-3.5-3.5" {...p}/></>,
    bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" {...p}/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" {...p}/></>,
    sun: <><circle cx="12" cy="12" r="4" {...p}/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" {...p}/></>,
    moon: <><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" {...p}/></>,
    sparkles: <><path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3z" {...p}/><path d="M19 14l.8 2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-1z" {...p}/><path d="M5 16l.6 1.5L7 18l-1.4.5L5 20l-.6-1.5L3 18l1.4-.5z" {...p}/></>,
    chevron: <><path d="m6 9 6 6 6-6" {...p}/></>,
    chevronRight: <><path d="m9 6 6 6-6 6" {...p}/></>,
    plus: <><path d="M12 5v14M5 12h14" {...p}/></>,
    filter: <><path d="M22 3H2l8 9.5V19l4 2v-8.5L22 3z" {...p}/></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" {...p}/><path d="M7 10l5 5 5-5" {...p}/><path d="M12 15V3" {...p}/></>,
    user: <><circle cx="12" cy="8" r="4" {...p}/><path d="M4 21a8 8 0 0 1 16 0" {...p}/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" {...p}/><path d="m3 7 9 6 9-6" {...p}/></>,
    phone: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.66 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.23a2 2 0 0 1 2.11-.45c.91.31 1.85.53 2.81.66A2 2 0 0 1 22 16.92z" {...p}/></>,
    money: <><circle cx="12" cy="12" r="9" {...p}/><path d="M15 9.5a3 3 0 0 0-3-1.5c-1.7 0-3 1-3 2.3 0 1.4 1.3 1.9 3 2.2s3 .8 3 2.2c0 1.3-1.3 2.3-3 2.3-1.7 0-2.7-.7-3-1.5M12 6.5v11" {...p}/></>,
    trend: <><path d="M3 17l6-6 4 4 8-8" {...p}/><path d="M14 7h7v7" {...p}/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" {...p}/><circle cx="9" cy="7" r="4" {...p}/><path d="M22 21v-2a4 4 0 0 0-3-3.87" {...p}/><path d="M16 3.13a4 4 0 0 1 0 7.75" {...p}/></>,
    target: <><circle cx="12" cy="12" r="9" {...p}/><circle cx="12" cy="12" r="5" {...p}/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/></>,
    arrowUp: <><path d="M7 17 17 7" {...p}/><path d="M7 7h10v10" {...p}/></>,
    arrowDown: <><path d="M17 7 7 17" {...p}/><path d="M17 17H7V7" {...p}/></>,
    more: <><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none"/></>,
    close: <><path d="M18 6 6 18M6 6l12 12" {...p}/></>,
    panel: <><rect x="3" y="3" width="18" height="18" rx="2" {...p}/><path d="M9 3v18" {...p}/></>,
    check: <><path d="M5 12l5 5L20 7" {...p}/></>,
    flame: <><path d="M12 2s4 3 4 8a4 4 0 0 1-8 0c0-2 1-3 1-3s-2 1-2 4a6 6 0 1 0 12 0c0-6-7-9-7-9z" {...p}/></>,
    return: <><path d="M9 14 4 9l5-5" {...p}/><path d="M20 20v-7a4 4 0 0 0-4-4H4" {...p}/></>,
    paperclip: <><path d="M21.4 11.05 12.3 20.16a5 5 0 0 1-7.07-7.07l9.19-9.19a3.33 3.33 0 1 1 4.71 4.71l-9.19 9.19a1.67 1.67 0 0 1-2.36-2.36l8.49-8.49" {...p}/></>,
    send: <><path d="m22 2-7 20-4-9-9-4 20-7z" {...p}/><path d="M22 2 11 13" {...p}/></>,
    edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" {...p}/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" {...p}/></>,
    trash: <><path d="M3 6h18" {...p}/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" {...p}/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" {...p}/><path d="M10 11v6M14 11v6" {...p}/></>,
    copy: <><rect x="9" y="9" width="13" height="13" rx="2" {...p}/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" {...p}/></>,
    external: <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" {...p}/><path d="M15 3h6v6" {...p}/><path d="m10 14 11-11" {...p}/></>,
    globe: <><circle cx="12" cy="12" r="9" {...p}/><path d="M3 12h18" {...p}/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" {...p}/></>,
    info: <><circle cx="12" cy="12" r="9" {...p}/><path d="M12 16v-4M12 8h.01" {...p}/></>,
    refresh: <><path d="M3 12a9 9 0 0 1 15-6.7L21 8" {...p}/><path d="M21 3v5h-5" {...p}/><path d="M21 12a9 9 0 0 1-15 6.7L3 16" {...p}/><path d="M3 21v-5h5" {...p}/></>,
    link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" {...p}/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.71" {...p}/></>,
    image: <><rect x="3" y="3" width="18" height="18" rx="2" {...p}/><circle cx="8.5" cy="8.5" r="1.5" {...p}/><path d="m21 15-5-5L5 21" {...p}/></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" {...p}/><path d="M14 2v6h6" {...p}/></>,
    lock: <><rect x="3" y="11" width="18" height="10" rx="2" {...p}/><path d="M7 11V7a5 5 0 0 1 10 0v4" {...p}/></>,
    help: <><circle cx="12" cy="12" r="9" {...p}/><path d="M9.1 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" {...p}/><path d="M12 17h.01" {...p}/></>,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" {...p}/><circle cx="12" cy="12" r="3" {...p}/></>,
    bolt: <><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" {...p}/></>,
    menu: <><path d="M3 6h18M3 12h18M3 18h18" {...p}/></>,
    tag: <><path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" {...p}/><circle cx="7" cy="7" r="1.4" fill="currentColor" stroke="none"/></>,
    star: <><path d="M12 2l2.9 6.9 7.1.6-5.5 4.7 1.6 7.3-6.1-3.9-6.1 3.9 1.6-7.3L2 9.5l7.1-.6z" {...p}/></>,
    upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" {...p}/><path d="M7 9l5-5 5 5" {...p}/><path d="M12 4v12" {...p}/></>,
  };
  return (
    <svg viewBox="0 0 24 24" className={className} style={s} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
