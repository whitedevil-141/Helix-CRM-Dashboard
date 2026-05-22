import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Topbar } from '@/components/Topbar/Topbar';
import { CustomerDrawer } from '@/components/Customers/CustomerDrawer';
import { CommandPalette } from '@/components/AIInsights/CommandPalette';
import { Toasts } from '@/components/AIInsights/Toasts';
import { TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakSelect } from '@/components/TweaksPanel';
import { AIAssistantPanel } from '@/panels/AIAssistantPanel';
import { HelpWidget } from '@/panels/HelpWidget';
import { NewDealModal, NewContactModal, NewEventModal, NewAutomationModal, ComposeModal, ConfirmDialog } from '@/components/Modals';
import { DashboardView } from '@/views/Dashboard/DashboardView';
import { PipelineView } from '@/views/Pipeline/PipelineView';
import { ContactsView } from '@/views/Contacts/ContactsView';
import { DealsView } from '@/views/Deals/DealsView';
import { InboxView } from '@/views/Inbox/InboxView';
import { ReportsView } from '@/views/Reports/ReportsView';
import { AutomationsView } from '@/views/Automations/AutomationsView';
import { CalendarView } from '@/views/Calendar/CalendarView';
import { ChatView } from '@/views/Chat/ChatView';
import { SettingsView } from '@/views/Settings/SettingsView';
import { ComponentsView } from '@/views/Components/ComponentsView';
import { useTweaks } from '@/hooks/useTweaks';
import { useToasts } from '@/hooks/useToasts';
import { useHelixDb, useHelixTable } from '@/hooks/useHelixDb';
import { HELIX_EVENTS } from '@/utils/eventBus';
import type { Page, TweakValues, ConfirmConfig, Customer } from '@/types';

const TWEAK_DEFAULTS: TweakValues = {
  theme: 'dark',
  accentPreset: 'indigo',
  density: 'comfy',
  sidebar: 'expanded',
  showAI: true,
};

const ACCENT_PRESETS: Record<string, { a1: string }> = {
  indigo:  { a1: '#6366F1' },
  emerald: { a1: '#10B981' },
  rose:    { a1: '#E11D48' },
  amber:   { a1: '#D97706' },
  slate:   { a1: '#475569' },
};

export function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const [page, setPage] = useState<Page>('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const db = useHelixDb();
  const deals = useHelixTable('SEED_DEALS');
  const { toasts, push } = useToasts();

  const [aiOpen, setAiOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [wsOpen, setWsOpen] = useState(false);
  const [newDealOpen, setNewDealOpen] = useState(false);
  const [newContactOpen, setNewContactOpen] = useState(false);
  const [newEventOpen, setNewEventOpen] = useState(false);
  const [newAutoOpen, setNewAutoOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [confirmCfg, setConfirmCfg] = useState<ConfirmConfig | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tweaks.theme);
  }, [tweaks.theme]);

  useEffect(() => {
    const root = document.documentElement;
    const p = ACCENT_PRESETS[tweaks.accentPreset] ?? ACCENT_PRESETS.indigo;
    root.style.setProperty('--a1', p.a1);
    root.style.setProperty('--a2', p.a1);
    root.style.setProperty('--a3', p.a1);
    root.style.setProperty('--accent', p.a1);
  }, [tweaks.accentPreset]);

  useEffect(() => {
    const val = tweaks.density === 'compact' ? '0.8' : tweaks.density === 'spacious' ? '1.15' : '1';
    document.documentElement.style.setProperty('--density', val);
  }, [tweaks.density]);

  useEffect(() => {
    setCollapsed(tweaks.sidebar === 'collapsed');
  }, [tweaks.sidebar]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 't') {
        e.preventDefault();
        setTweak('theme', tweaks.theme === 'dark' ? 'light' : 'dark');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [tweaks.theme, setTweak]);

  useEffect(() => {
    const open = () => setPaletteOpen(true);
    window.addEventListener(HELIX_EVENTS.OPENPALETTE, open);
    return () => window.removeEventListener(HELIX_EVENTS.OPENPALETTE, open);
  }, []);

  useEffect(() => {
    const onNewDeal      = () => setNewDealOpen(true);
    const onNewContact   = () => setNewContactOpen(true);
    const onNewEvent     = () => setNewEventOpen(true);
    const onNewAuto      = () => setNewAutoOpen(true);
    const onCompose      = () => setComposeOpen(true);
    const onOpenAI       = () => setAiOpen(true);
    const onConfirm      = (e: Event) => setConfirmCfg((e as CustomEvent<ConfirmConfig>).detail);
    const onToast        = (e: Event) => push((e as CustomEvent<string>).detail);

    window.addEventListener(HELIX_EVENTS.NEW_DEAL, onNewDeal);
    window.addEventListener(HELIX_EVENTS.NEW_CONTACT, onNewContact);
    window.addEventListener(HELIX_EVENTS.NEW_EVENT, onNewEvent);
    window.addEventListener(HELIX_EVENTS.NEW_AUTOMATION, onNewAuto);
    window.addEventListener(HELIX_EVENTS.COMPOSE, onCompose);
    window.addEventListener(HELIX_EVENTS.OPEN_AI, onOpenAI);
    window.addEventListener(HELIX_EVENTS.CONFIRM, onConfirm);
    window.addEventListener(HELIX_EVENTS.TOAST, onToast);

    return () => {
      window.removeEventListener(HELIX_EVENTS.NEW_DEAL, onNewDeal);
      window.removeEventListener(HELIX_EVENTS.NEW_CONTACT, onNewContact);
      window.removeEventListener(HELIX_EVENTS.NEW_EVENT, onNewEvent);
      window.removeEventListener(HELIX_EVENTS.NEW_AUTOMATION, onNewAuto);
      window.removeEventListener(HELIX_EVENTS.COMPOSE, onCompose);
      window.removeEventListener(HELIX_EVENTS.OPEN_AI, onOpenAI);
      window.removeEventListener(HELIX_EVENTS.CONFIRM, onConfirm);
      window.removeEventListener(HELIX_EVENTS.TOAST, onToast);
    };
  }, [push]);

  return (
    <div className="app">
      <Sidebar
        active={page}
        onChange={(p) => { setPage(p); setMobileNavOpen(false); }}
        collapsed={collapsed}
        onToggle={() => {
          setCollapsed(c => !c);
          setTweak('sidebar', !collapsed ? 'collapsed' : 'expanded');
        }}
        onCreate={() => setPaletteOpen(true)}
        wsOpen={wsOpen}
        onToggleWs={() => setWsOpen(o => !o)}
        userOpen={userOpen}
        onToggleUser={() => setUserOpen(o => !o)}
        push={push}
        mobileOpen={mobileNavOpen}
      />
      <div className={'mobile-backdrop' + (mobileNavOpen ? ' open' : '')} onClick={() => setMobileNavOpen(false)}></div>
      <main className="main">
        <Topbar
          page={page}
          onToggleAI={() => setAiOpen(o => !o)}
          onToggleTheme={() => setTweak('theme', tweaks.theme === 'dark' ? 'light' : 'dark')}
          theme={tweaks.theme}
          onOpenPalette={() => setPaletteOpen(true)}
          notifOpen={notifOpen}
          onToggleNotif={() => setNotifOpen(o => !o)}
          onCloseNotif={() => setNotifOpen(false)}
          userOpen={userOpen}
          onToggleUser={() => setUserOpen(o => !o)}
          onCloseUser={() => setUserOpen(false)}
          onNavigate={setPage}
          push={push}
          onToggleMobile={() => setMobileNavOpen(o => !o)}
        />

        <div className="page">
          <div className="page-inner">
            {page === 'dashboard'   && <DashboardView push={push} deals={deals} showAI={tweaks.showAI}/>}
            {page === 'pipeline'    && <PipelineView deals={deals}/>}
            {page === 'contacts'    && <ContactsView onSelect={setSelectedCustomer}/>}
            {page === 'deals'       && <DealsView deals={deals}/>}
            {page === 'inbox'       && <InboxView/>}
            {page === 'reports'     && <ReportsView/>}
            {page === 'automations' && <AutomationsView/>}
            {page === 'calendar'    && <CalendarView/>}
            {page === 'chat'        && <ChatView/>}
            {page === 'settings'    && <SettingsView/>}
            {page === 'components'  && <ComponentsView/>}
          </div>
        </div>
      </main>

      <CustomerDrawer customer={selectedCustomer} onClose={() => setSelectedCustomer(null)}/>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onNavigate={setPage}/>
      <Toasts toasts={toasts}/>

      <NewDealModal
        open={newDealOpen}
        onClose={() => setNewDealOpen(false)}
        onCreate={(d) => {
          db.create('SEED_DEALS', d, { bucket: d.stage });
          push(`Deal "${d.name}" added to ${d.stage}`);
        }}
      />
      <NewContactModal
        open={newContactOpen}
        onClose={() => setNewContactOpen(false)}
        onCreate={(c) => push(`${c.name ?? 'Contact'} added as ${c.status ?? 'lead'}`)}
      />
      <NewEventModal
        open={newEventOpen}
        onClose={() => setNewEventOpen(false)}
        onCreate={(e) => push(`Event "${e.title}" scheduled`)}
      />
      <NewAutomationModal
        open={newAutoOpen}
        onClose={() => setNewAutoOpen(false)}
        onCreate={(a) => push(`Automation "${a.name}" created`)}
      />
      <ComposeModal
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        onSend={(m) => push(`Message sent to ${m.to}`)}
      />
      {confirmCfg && (
        <ConfirmDialog
          open={!!confirmCfg}
          onClose={() => setConfirmCfg(null)}
          onConfirm={confirmCfg.onConfirm}
          title={confirmCfg.title}
          message={confirmCfg.message}
          confirmLabel={confirmCfg.confirmLabel}
          destructive={confirmCfg.destructive}
        />
      )}

      <AIAssistantPanel open={aiOpen} onClose={() => setAiOpen(false)} push={push}/>
      <HelpWidget/>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Appearance">
          <TweakRadio
            label="Theme"
            value={tweaks.theme}
            onChange={(v) => setTweak('theme', v)}
            options={[{ value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }]}
          />
          <TweakSelect
            label="Accent"
            value={tweaks.accentPreset}
            onChange={(v) => setTweak('accentPreset', v)}
            options={[
              { value: 'indigo',  label: 'Indigo' },
              { value: 'emerald', label: 'Emerald' },
              { value: 'rose',    label: 'Rose' },
              { value: 'amber',   label: 'Amber' },
              { value: 'slate',   label: 'Slate' },
            ]}
          />
          <TweakRadio
            label="Density"
            value={tweaks.density}
            onChange={(v) => setTweak('density', v)}
            options={[
              { value: 'compact',  label: 'Compact' },
              { value: 'comfy',    label: 'Comfy' },
              { value: 'spacious', label: 'Spacious' },
            ]}
          />
        </TweakSection>
        <TweakSection label="Layout">
          <TweakRadio
            label="Sidebar"
            value={tweaks.sidebar}
            onChange={(v) => setTweak('sidebar', v)}
            options={[
              { value: 'expanded',  label: 'Expanded' },
              { value: 'collapsed', label: 'Collapsed' },
            ]}
          />
          <TweakToggle
            label="Show AI insights"
            value={tweaks.showAI}
            onChange={(v) => setTweak('showAI', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}
