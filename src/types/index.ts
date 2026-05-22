export type Deal = {
  id: string;
  name: string;
  co: string;
  value: number;
  tag: 'cold' | 'warm' | 'hot';
  members: string[];
  progress: number;
};

export type Stage = {
  id: string;
  name: string;
  color: string;
};

export type DealsByStage = Record<string, Deal[]>;

export type Customer = {
  id: number;
  name: string;
  email: string;
  company: string;
  plan: 'Pro' | 'Scale' | 'Enterprise';
  mrr: number;
  status: 'active' | 'trial' | 'lead' | 'churn';
  country: string;
  joined: string;
  owner: string;
};

export type ActivityItem = {
  id: string;
  kind: 'success' | 'info' | 'warn';
  text: string;
  meta: string;
  time: string;
};

export type FunnelStage = {
  label: string;
  value: number;
  pct: number;
};

export type Page =
  | 'dashboard'
  | 'pipeline'
  | 'contacts'
  | 'deals'
  | 'inbox'
  | 'reports'
  | 'automations'
  | 'calendar'
  | 'chat'
  | 'settings'
  | 'components';

export type TweakValues = {
  theme: 'dark' | 'light';
  accentPreset: string;
  density: 'compact' | 'comfy' | 'spacious';
  sidebar: 'expanded' | 'collapsed';
  showAI: boolean;
};

export type Toast = {
  id: string;
  text: string;
};

export type ConfirmConfig = {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  destructive?: boolean;
};

export type IconName =
  | 'dashboard'
  | 'contacts'
  | 'deals'
  | 'pipeline'
  | 'inbox'
  | 'automations'
  | 'reports'
  | 'calendar'
  | 'chat'
  | 'settings'
  | 'search'
  | 'bell'
  | 'sun'
  | 'moon'
  | 'sparkles'
  | 'chevron'
  | 'chevronRight'
  | 'plus'
  | 'filter'
  | 'download'
  | 'user'
  | 'mail'
  | 'phone'
  | 'money'
  | 'trend'
  | 'users'
  | 'target'
  | 'arrowUp'
  | 'arrowDown'
  | 'more'
  | 'close'
  | 'panel'
  | 'check'
  | 'flame'
  | 'return'
  | 'paperclip'
  | 'send'
  | 'edit'
  | 'trash'
  | 'copy'
  | 'external'
  | 'globe'
  | 'info'
  | 'refresh'
  | 'link'
  | 'image'
  | 'file'
  | 'lock'
  | 'help'
  | 'eye'
  | 'bolt'
  | 'menu'
  | 'tag'
  | 'star'
  | 'upload';

export type HelixData = {
  SEED_DEALS: DealsByStage;
  STAGES: Stage[];
  CUSTOMERS: Customer[];
  ACTIVITY: ActivityItem[];
  REV_THIS: number[];
  REV_LAST: number[];
  MONTHS: string[];
  FUNNEL: FunnelStage[];
  HEAT: number[][];
};

export type HelixDb = {
  data: HelixData;
  getVersion: () => number;
  toJson: () => string;
  exportJson: (filename?: string) => void;
  saveToStorage: () => void;
  loadFromStorage: () => boolean;
  get: <K extends keyof HelixData>(key: K) => HelixData[K];
  list: <K extends keyof HelixData>(key: K) => HelixData[K];
  create: (
    key: keyof HelixData,
    item: unknown,
    options?: { bucket?: string; stageId?: string; stage?: string },
  ) => unknown;
  update: (key: keyof HelixData, id: string | number, patch: Record<string, unknown>) => unknown;
  remove: (key: keyof HelixData, id: string | number) => unknown;
  moveDeal: (
    id: string,
    toStage: string,
    options?: { fromStage?: string; updateProgress?: boolean },
  ) => unknown;
  reset: () => void;
  subscribe: (listener: (data: HelixData) => void) => () => void;
};
